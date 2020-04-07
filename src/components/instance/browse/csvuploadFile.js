import React, { useState, useCallback } from 'react';
import { Button } from '@nio/ui-kit';
import { useHistory, useParams } from 'react-router';
import { useStoreState } from 'pullstate';
import Dropzone from 'react-dropzone';
import useAsyncEffect from 'use-async-effect';

import instanceState from '../../../state/stores/instanceState';
import config from '../../../../config';

import getJob from '../../../api/instance/getJob';
import csvDataLoad from '../../../api/instance/csvDataLoad';
import commaNumbers from '../../../util/commaNumbers';

export default () => {
  const history = useHistory();
  const { schema, table } = useParams();
  const { compute_stack_id, auth, url } = useStoreState(instanceState, (s) => ({
    compute_stack_id: s.compute_stack_id,
    auth: s.auth,
    url: s.url,
  }));

  const [formData, setFormData] = useState({});
  const [formState, setFormState] = useState({});
  const [mounted, setMounted] = useState(false);

  // query the table to determine if all the records have been processed.
  const validateData = useCallback(async (uploadJobId) => {
    const [{ status, message }] = await getJob({ auth, url, id: uploadJobId });

    if (status === 'ERROR') {
      if (message.indexOf('transaction aborted due to record(s) with a hash value that contains a forward slash') !== -1) {
        return setFormState({ error: 'The CSV file contains a row with a forward slash in the hash field.' });
      }
      if (message.indexOf('Invalid column name') !== -1) {
        return setFormState({ error: 'The CSV file contains an invalid column name.' });
      }
      return setFormState({ error: message });
    }

    if (status !== 'COMPLETE' && mounted) {
      return setTimeout(() => validateData(uploadJobId), 2000);
    }

    instanceState.update((s) => {
      s.lastUpdate = Date.now();
    });

    return setTimeout(() => {
      history.push(`/instance/${compute_stack_id}/browse/${schema}/${table}`);
    }, 1000);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => setFormState({ error: 'File reading was aborted' });
      reader.onerror = () => setFormState({ error: 'file reading has failed' });
      reader.onload = () => {
        setFormState({ processing: true });
        const lines = reader.result.match(/\r?\n/g);
        setFormData({ records: lines.length - 1, csv_file: reader.result });
        setFormState({ processed: true });
      };
      if (file.size > config.max_file_upload_size) {
        setFormState({ error: 'File exceeds 10MB Limit. Use URL Loader Above.' });
      } else {
        reader.readAsText(file);
      }
    });
  }, []);

  useAsyncEffect(async () => {
    const { submitted } = formState;
    if (submitted) {
      const { csv_file } = formData;
      if (csv_file) {
        setFormState({ uploading: true });
        const uploadJob = await csvDataLoad({ schema, table, csv_file, auth, url });
        const uploadJobId = uploadJob.message.replace('Starting job with id ', '');
        setTimeout(() => validateData(uploadJobId), 1000);
      } else {
        setFormState({ error: 'Please select a valid CSV file' });
      }
    }
  }, [formState]);

  useAsyncEffect(
    () => setMounted(true),
    () => setMounted(false),
    []
  );

  return (
    <>
      <b className="text-small">Upload A CSV FIle (10MB Limit)</b>
      <hr className="my-1" />
      {formState.error ? (
        <div className="text-danger csv-status">{formState.error}</div>
      ) : formState.uploading ? (
        <div className="csv-status">
          <i className="fa fa-spin fa-spinner mr-3" />
          inserting {commaNumbers(formData.records)} records into {schema}.{table}
        </div>
      ) : formState.processed ? (
        <div
          className="csv-status"
          onClick={() => {
            setFormState({});
            setFormData({});
          }}
        >
          <i className="fa fa-thumbs-up text-success mr-3" />
          {commaNumbers(formData.records)} records. Click here to replace file.
        </div>
      ) : formState.processing ? (
        <div className="csv-status">
          <i className="fa fa-spin fa-spinner" /> processing {commaNumbers(formData.records)} records
        </div>
      ) : (
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="drop-zone">
              <input {...getInputProps()} />
              Click or Drag to select a .csv file
            </div>
          )}
        </Dropzone>
      )}
      <div className="pt-2">
        {formState.error ? (
          <Button
            color="danger"
            block
            className="px-5 clear-files"
            onClick={() => {
              setFormState({});
              setFormData({});
            }}
          >
            Clear File
          </Button>
        ) : (
          <Button block disabled={formState.uploading || !formData.csv_file} color="success" onClick={() => setFormState({ submitted: true })}>
            Insert {commaNumbers(formData.records)} Records
          </Button>
        )}
      </div>
    </>
  );
};