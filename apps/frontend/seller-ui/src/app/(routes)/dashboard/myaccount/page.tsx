'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import './account.css'

type Vendor = {
  id: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  profileImage: string | null;
  businessName: string;
  phone: string;
  altphone?: string;
  website?: string;
  description?: string;
  status: string;
  address: string | null;
  gstNumber: string | null;
  kycDocsUrl: string[];
  createdAt: string;
  updatedAt: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
console.log('🔑 JWT Token:', token);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingKyc, setUploadingKyc] = useState(false);

  // 🔍 Decode token and extract vendor ID
  useEffect(() => {
    if (!token) {
      console.log('🔴 No token found, redirecting to login');
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      console.log('✅ Token decoded:', decoded);

     if (decoded.vendorId) {
  console.log('✅ Setting vendorId:', decoded.vendorId);
  setVendorId(decoded.vendorId);  // ✅ CORRECT

      } else {
        console.error('❌ Invalid token: Missing userId');
        throw new Error('Invalid token');
      }
    } catch (err) {
      console.error('❌ Failed to decode token:', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [token, router]);

  // 🔍 Fetch vendor details
  useEffect(() => {
    const fetchVendor = async () => {
      if (!vendorId || !token) {
        console.log('⏳ Waiting for vendorId and token...');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log(`📦 Fetching vendor details for ID: ${vendorId}`);

        const response = await fetch(`http://localhost:3010/api/vendor/${vendorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Error fetching vendor:', errorData);
          throw new Error(errorData.message || 'Failed to fetch vendor details');
        }

        const data = await response.json();
     
        setVendor(data.vendor);
      } catch (err: any) {
        console.error('❌ Fetch vendor error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [vendorId, token]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('👋 Logged out');
    router.push('/login');
  };

  // The rest of your component continues...
const handleSave = async (e: FormEvent) => {
  e.preventDefault();
  if (!vendor) return;
  setSaving(true);
  setError(null);

  const payload = {
    name: vendor.name,
    businessName: vendor.businessName || '',
    phone: vendor.phone,
    altphone: vendor.altphone || '',
    email: vendor.email,
    website: vendor.website || '',
    address: vendor.address || '',
    description: vendor.description || '',
    gstNumber: vendor.gstNumber || '',
  };

  console.log('📤 Sending PUT request with payload:', payload);

  try {
    const response = await fetch(`http://localhost:3010/api/vendor/profile/${vendorId}`, {
      method: 'PUT',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ PUT failed with:', errorData);
      throw new Error(errorData.message || 'Failed to save vendor details');
    }

    const data = await response.json();
    setVendor(data.vendor);
    alert('Vendor profile updated successfully!');
  } catch (err: any) {
    console.error('❌ Save error:', err.message);
    alert(`Error saving profile: ${err.message}`);
    setError(err.message);
  } finally {
    setSaving(false);
  }
};
 const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!vendor) return;
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };
  // Upload Profile Image handler
  const handleProfileImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !vendor) return;
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setUploadingProfile(true);
      setError(null);

      const response = await fetch(`http://localhost:3010/api/vendor/${vendorId}/upload-profile-image`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload profile image');
      }

      const data = await response.json();
      // Update profile image URL in vendor state
      setVendor({ ...vendor, profileImage: data.profileImageUrl });
      alert('Profile image uploaded successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingProfile(false);
    }
  };

  // Upload KYC documents handler (multiple files)
  const handleKycUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !vendor) return;
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach(file => formData.append('kycDocs', file));

    try {
      setUploadingKyc(true);
      setError(null);

      const response = await fetch(`http://localhost:3010/api/vendor/${vendorId}/upload-kyc-docs`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload KYC documents');
      }

      const data = await response.json();
      // Append new docs URLs to existing ones
      setVendor({ ...vendor, kycDocsUrl: [...vendor.kycDocsUrl, ...data.kycDocsUrls] });
      alert('KYC documents uploaded successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingKyc(false);
    }
  };

  if (loading) return <p>Loading vendor details...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!vendor) return <p>No vendor data found.</p>;

  return (
    <div className='account-page'>
      <h2>Vendor Profile</h2>

      {/* Profile Image */}
      <div style={{ marginBottom: '1rem' }}>
        {vendor.profileImage ? (
          <img
            src={vendor.profileImage}
            alt="Profile"
            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
          />
        ) : (
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              color: '#666',
            }}
          >
            No Profile Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImageUpload}
          disabled={uploadingProfile}
          style={{ marginTop: '8px' }}
        />
        {uploadingProfile && <p>Uploading profile image...</p>}
      </div>

      {/* KYC Documents */}
     

      {/* Editable Form */}
      <form onSubmit={handleSave}>
        <div className='first-column'>

       
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={vendor.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className='full-width-input'
          />
        </label>

        <label>
          Email: (read-only)
          <input
            type="email"
            name="email"
            value={vendor.email}
            readOnly
          
          />
        </label>
         </div>
 <div className='first-column'>
        <label>
          Business Name:
          <input
            type="text"
            name="businessName"
            value={vendor.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
           
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={vendor.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          
          />
        </label>
        </div>
         <div className='first-column'>

        <label>
          Address:
          <textarea
            name="address"
            value={vendor.address || ''}
            onChange={handleChange}
            placeholder="Enter address"
          
          />
        </label>

        <label>
          GST Number:
          <input
            type="text"
            name="gstNumber"
            value={vendor.gstNumber || ''}
            onChange={handleChange}
            placeholder="Enter GST number"
            
          />
        </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
        <h4>KYC Documents:</h4>
        {vendor.kycDocsUrl.length > 0 ? (
          vendor.kycDocsUrl.map((docUrl, idx) => (
            <div key={idx}>
              <a href={docUrl} target="_blank" rel="noopener noreferrer">
                Document {idx + 1}
              </a>
            </div>
          ))
        ) : (
          <p>No KYC documents uploaded</p>
        )}
        <input
          type="file"
          multiple
          accept="application/pdf,image/*"
          onChange={handleKycUpload}
          disabled={uploadingKyc}
         
        />
        {uploadingKyc && <p>Uploading KYC documents...</p>}
      </div>
        <button type="submit" disabled={saving} style={{ marginTop: '12px', padding: '8px 16px' }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
         <button
        onClick={handleLogout}
      
      >
        Logout
      </button>
      </form>
    </div>
  );
};

export default Page;
