import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

type Variant = {
  name: string;
  value: string;
};

type FormData = {
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  imageUrls: string; // comma separated URLs for simplicity
  brand?: string;
  includedComponents?: string; // comma separated
  numberOfItems?: number;
  enclosureMaterial?: string;
  productCareInstructions?: string;
  productFeatures?: string; // comma separated

  sku: string;
  stock: number;
  unit: string;
  itemWeight: number;
  packageLength?: number;
  packageWidth?: number;
  packageHeight?: number;
  deliveryEta?: string;
  vendorId: string;

  dispatchTimeInDays?: number;
  shippingCost?: number;

  variants?: Variant[];
};

const CreateProductPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      variants: [{ name: '', value: '' }],
      includedComponents: '',
      productFeatures: '',
      imageUrls: '',
    },
  });

 const onSubmit = async (data: FormData) => {
    try {
      // Prepare payload same as before
      const variants = data.variants?.filter(v => v.name && v.value) || [];

      const payload = {
        ...data,
        includedComponents: data.includedComponents?.split(',').map(s => s.trim()) || [],
        productFeatures: data.productFeatures?.split(',').map(s => s.trim()) || [],
        imageUrls: data.imageUrls.split(',').map(s => s.trim()),
        variants,
      };
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '3003';
  await axios.post(`${apiBaseUrl}/api/products/create`, payload);

      toast.success('Product created successfully!');
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to create product');
    }
  };
  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Title */}
        <div>
          <label>Title *</label><br />
          <input {...register('title', { required: 'Title is required' })} />
          {errors.title && <p style={{color: 'red'}}>{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label><br />
          <textarea {...register('description')} />
        </div>

        {/* Category */}
        <div>
          <label>Category *</label><br />
          <input {...register('category', { required: 'Category is required' })} />
          {errors.category && <p style={{color: 'red'}}>{errors.category.message}</p>}
        </div>

        {/* SubCategory */}
        <div>
          <label>Sub Category</label><br />
          <input {...register('subCategory')} />
        </div>

        {/* Image URLs */}
        <div>
          <label>Image URLs (comma separated) *</label><br />
          <input {...register('imageUrls', { required: 'At least one image URL is required' })} />
          {errors.imageUrls && <p style={{color: 'red'}}>{errors.imageUrls.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label>Brand</label><br />
          <input {...register('brand')} />
        </div>

        {/* Included Components */}
        <div>
          <label>Included Components (comma separated)</label><br />
          <input {...register('includedComponents')} />
        </div>

        {/* Number of Items */}
        <div>
          <label>Number of Items</label><br />
          <input type="number" {...register('numberOfItems', { valueAsNumber: true })} />
        </div>

        {/* Enclosure Material */}
        <div>
          <label>Enclosure Material</label><br />
          <input {...register('enclosureMaterial')} />
        </div>

        {/* Product Care Instructions */}
        <div>
          <label>Product Care Instructions</label><br />
          <input {...register('productCareInstructions')} />
        </div>

        {/* Product Features */}
        <div>
          <label>Product Features (comma separated)</label><br />
          <input {...register('productFeatures')} />
        </div>

        {/* SKU */}
        <div>
          <label>SKU *</label><br />
          <input {...register('sku', { required: 'SKU is required' })} />
          {errors.sku && <p style={{color: 'red'}}>{errors.sku.message}</p>}
        </div>

        {/* Stock */}
        <div>
          <label>Stock *</label><br />
          <input type="number" {...register('stock', { required: 'Stock is required', valueAsNumber: true })} />
          {errors.stock && <p style={{color: 'red'}}>{errors.stock.message}</p>}
        </div>

        {/* Unit */}
        <div>
          <label>Unit *</label><br />
          <input {...register('unit', { required: 'Unit is required' })} />
          {errors.unit && <p style={{color: 'red'}}>{errors.unit.message}</p>}
        </div>

        {/* Item Weight */}
        <div>
          <label>Item Weight *</label><br />
          <input type="number" step="0.01" {...register('itemWeight', { required: 'Item Weight is required', valueAsNumber: true })} />
          {errors.itemWeight && <p style={{color: 'red'}}>{errors.itemWeight.message}</p>}
        </div>

        {/* Package Length */}
        <div>
          <label>Package Length</label><br />
          <input type="number" step="0.01" {...register('packageLength', { valueAsNumber: true })} />
        </div>

        {/* Package Width */}
        <div>
          <label>Package Width</label><br />
          <input type="number" step="0.01" {...register('packageWidth', { valueAsNumber: true })} />
        </div>

        {/* Package Height */}
        <div>
          <label>Package Height</label><br />
          <input type="number" step="0.01" {...register('packageHeight', { valueAsNumber: true })} />
        </div>

        {/* Delivery ETA */}
        <div>
          <label>Delivery ETA</label><br />
          <input {...register('deliveryEta')} />
        </div>

        {/* Dispatch Time in Days */}
        <div>
          <label>Dispatch Time (days)</label><br />
          <input type="number" {...register('dispatchTimeInDays', { valueAsNumber: true })} />
        </div>

        {/* Shipping Cost */}
        <div>
          <label>Shipping Cost</label><br />
          <input type="number" step="0.01" {...register('shippingCost', { valueAsNumber: true })} />
        </div>

        {/* Vendor ID */}
        <div>
          <label>Vendor ID *</label><br />
          <input {...register('vendorId', { required: 'Vendor ID is required' })} />
          {errors.vendorId && <p style={{color: 'red'}}>{errors.vendorId.message}</p>}
        </div>

        {/* Variants */}
        <div>
          <label>Variants</label>
      <Controller
  control={control}
  name="variants"
  render={({ field }) => (
    <>
      {(field.value ?? []).map((variant, idx) => (
        <div key={idx} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 5 }}>
          <input
            placeholder="Name"
            value={variant.name}
            onChange={e => {
              const newVariants = [...(field.value ?? [])];
              newVariants[idx].name = e.target.value;
              field.onChange(newVariants);
            }}
            style={{ marginRight: 5 }}
          />
          <input
            placeholder="Value"
            value={variant.value}
            onChange={e => {
              const newVariants = [...(field.value ?? [])];
              newVariants[idx].value = e.target.value;
              field.onChange(newVariants);
            }}
          />
          <button
            type="button"
            onClick={() => {
              const newVariants = (field.value ?? []).filter((_, i) => i !== idx);
              field.onChange(newVariants);
            }}
            style={{ marginLeft: 10 }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => field.onChange([...(field.value ?? []), { name: '', value: '' }])}
      >
        Add Variant
      </button>
    </>
  )}
/>
        </div>

        <br />
        <button type="submit" disabled={isSubmitting}>Create Product</button>
      </form>

 <Toaster position="top-right" />
    </div>
  );
};

export default CreateProductPage;
