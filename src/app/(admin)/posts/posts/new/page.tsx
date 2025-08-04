'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Upload, X, Plus, Tag, List, Table, QuoteIcon } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AddList from '../../components/AddList';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
});

interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  isPublished: boolean;
  isFeatured: boolean;
  allowComments: boolean;
}

const categories = [
  { id: 'politics', name: 'Politics' },
  { id: 'sports', name: 'Sports' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'technology', name: 'Technology' },
  { id: 'health', name: 'Health' },
  { id: 'business', name: 'Business' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'world', name: 'World News' },
];

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    featuredImage: '',
    isPublished: false,
    isFeatured: false,
    allowComments: true,
  });

  const handleInputChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [dropdown, setDropdown] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const [content, setContent] = useState<string[]>(['']);

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push('/admin/posts');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('featuredImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-6 lg:px-8 max-w-full">
      {/* Page header */}
      <div className="mb-8 flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div>
            <Link
              href="/admin/posts"
              className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Posts
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
              <p className="mt-2 text-gray-600">Add a new article to your blog</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={() => handleInputChange('isPublished', !formData.isPublished)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
          <button
            type="submit"
            form="post-form"
            disabled={isLoading}
            className="admin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <form id="post-form" onSubmit={handleSubmit} className="space-y-8 ">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Content */}
            <div className="admin-card">
              <div className="admin-card-body space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Post Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter post title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Enter a brief excerpt..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Content</label>
                  <ReactQuill
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Write your post content here..."
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['link', 'image', 'blockquote', 'code-block'],
                        ['clean']
                      ],
                    }}
                    formats={[
                      'header',
                      'bold', 'italic', 'underline', 'strike',
                      'list', 'bullet',
                      'color', 'background',
                      'align',
                      'link', 'image', 'blockquote', 'code-block'
                    ]}
                    className="min-h-[200px]"
                  />
                </div>

                <div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <div className="admin-card">
              <div className="admin-card-body space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing</h2>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Publish immediately</label>
                    <p className="text-xs text-gray-500">Make this post live</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Featured post</label>
                    <p className="text-xs text-gray-500">Highlight on homepage</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allow comments</label>
                    <p className="text-xs text-gray-500">Let readers comment</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allowComments}
                      onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="admin-card">
              <div className="admin-card-body">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="admin-card">
              <div className="admin-card-body space-y-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Tags</label>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-body">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Upload featured image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="featured-image"
                  />
                  <label
                    htmlFor="featured-image"
                    className="admin-btn-secondary cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                {formData.featuredImage && (
                  <div className="mt-4">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     {

      content.length > 1 && (
        <div className="admin-card space-y-8 lg:mt-6 lg:col-span-2 ">
          <div className="admin-card-body space-y-6">
            {
              content.map((item, index) => {
                switch (item) {
                  case 'list':
                    return <AddList key={index} />
                  case 'table':
                    return <div key={index}>Table Component</div>
                  case 'quote':
                    return <div key={index}>Quote Component</div>
                  default:
                    return null;
                }
              })
            }
          </div>
        </div> 
      )
     }
      
        <div className="admin-card space-y-8 lg:col-span-2 ">
          <div className="admin-card-body space-y-6">
            <div className="relative">
              <button onClick={() => setDropdown(!dropdown)} className="admin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed">

                add content
              </button>
              {
                dropdown && (
                  <div style={{ bottom: "39px" }} className="absolute left-10 bg-white  shadow-lg border rounded-lg w-1/2">
                    <ul className='text-sm py-2'>
                      <li onClick={() => setContent([...content, 'list'])} className='py-2 cursor-pointer px-3 hover:bg-gray-100 flex items-center gap-2'><List className='w-3 h-3' />List</li>
                      <li onClick={() => setContent([...content, 'table'])} className='py-2 cursor-pointer px-3 hover:bg-gray-100 flex items-center gap-2'><Table className='w-3 h-3' />Tabel</li>
                      <li onClick={() => setContent([...content, 'quote'])} className='py-2 cursor-pointer px-3 hover:bg-gray-100 flex items-center gap-2'><QuoteIcon className='w-3 h-3' />Quotations</li>
                    </ul>
                  </div>
                )
              }
            </div>

          </div>
        </div>

      </div>


    </div>
  );
} 