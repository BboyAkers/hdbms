import React from 'react';
import { Input, Button } from 'reactstrap';
import { useStoreState } from 'pullstate';

import appState from '../../state/appState';
import updateFilter from '../../methods/organizations/updateFilter';
import clearFilter from '../../methods/organizations/clearFilter';

const Search = () => {
  const orgSearch = useStoreState(appState, (s) => s.orgSearch);

  return (
    <>
      <Input id="filter_orgs" type="text" className="text-center" onChange={updateFilter} placeholder="filter your organizations" value={orgSearch || ''} />
      {orgSearch && (
        <Button className="clear-filter" onClick={clearFilter}>
          <i className="fa fa-times" />
        </Button>
      )}
    </>
  );
};

export default Search;
