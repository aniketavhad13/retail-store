export interface Store {
  store_id: number;
  sku: string;
  product_name: string;
  price: string;
  date: string;
  isEdit: boolean;
}

export const StoreColumns = [
  {
    key: 'store_id',
    type: '',
    label: 'Store id'
  },
  {
    key: 'sku',
    type: '',
    label: 'SKU'
  },
  {
    key: 'product_name',
    type: 'text',
    label: 'Product Name',
    required: true
  },
  {
    key: 'price',
    type: 'text',
    label: 'Product price',
    required: true
  },
  {
    key: 'date',
    type: 'date',
    label: 'Date',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
