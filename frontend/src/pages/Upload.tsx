import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('http://localhost:4000/api/assets/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="p-4">
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
        Upload
      </button>
    </div>
  );
}