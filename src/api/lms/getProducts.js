import queryLMS from '../queryLMS';

const buildRadioSelectProductOptions = ({ id, amount_decimal, interval, amount, metadata: { instance_ram } }) => {
  return {
    price: amount_decimal !== '0' ? (amount_decimal / 100).toFixed(2) : 'FREE',
    ram: instance_ram,
    interval,
    label: `${instance_ram} RAM | ${amount_decimal !== '0' ? `${amount}/${interval}` : 'FREE'}`,
    value: id,
  };
};

const buildRadioSelectStorageOptions = (size, { tiers, interval }) => {
  const pricingTier = tiers.find((p) => (p.up_to && size <= p.up_to) || !p.up_to);
  const price = (size * (pricingTier.unit_amount / 100)).toFixed(2);
  return {
    price: pricingTier.unit_amount ? (size * (pricingTier.unit_amount / 100)).toFixed(2) : 'FREE',
    disk_space: size === 1000 ? '1TB' : `${size}GB`,
    interval,
    label: `${size === 1000 ? '1TB' : `${size}GB`} Disk Space | ${pricingTier.unit_amount ? `$${price}/${interval}` : 'FREE'}`,
    value: size,
  };
};

export default async ({ auth }) => {
  const newProducts = await queryLMS({
    endpoint: 'getProducts',
    method: 'POST',
    auth,
  });

  const localComputeOptions = newProducts.body.find((p) => p.name === 'HarperDB Local Annual');
  const cloudComputeOptions = newProducts.body.find((p) => p.name === 'HarperDB Cloud Beta');
  const cloudStoragePlans = newProducts.body.find((p) => p.name === 'HarperDB Cloud Storage');
  const cloudStorageOptions = [10, 100, 250, 500, 1000];

  const cloudStorage = cloudStorageOptions.map((size) => buildRadioSelectStorageOptions(size, cloudStoragePlans.plans[0]));
  const cloudCompute = cloudComputeOptions.plans.map((p) => buildRadioSelectProductOptions(p));
  const localCompute = localComputeOptions.plans.map((p) => buildRadioSelectProductOptions(p));

  return {
    cloudStorage,
    cloudCompute,
    localCompute,
  };
};
