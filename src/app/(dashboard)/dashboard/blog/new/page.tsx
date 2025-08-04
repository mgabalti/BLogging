'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  faArrowLeft, 
  faImage, 
  faChevronDown,
  faTimes,
  faSave,
  faSpinner,
  faTag
} from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from '@/components/ui/FontAwesomeIcon';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { apiService, CategoryDto, TagDto } from '@/services/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 rounded-lg animate-pulse"></div>
});

export default function NewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    isPublished: false
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  // API Data
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Load categories and tags from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, tagsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getTags()
        ]);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load categories and tags');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploadingImage(true);
        
        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        // Upload to server
        const uploadedImage = await apiService.uploadImage(file, file.name, file.name);
        setSelectedImageId(uploadedImage.id);
        
        toast.success('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
        setPreviewImage(null);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagName = tagInput.trim();
      if (tagName) {
        // Find existing tag by name
        const existingTag = tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
        if (existingTag && !selectedTags.includes(existingTag.id)) {
          setSelectedTags(prev => [...prev, existingTag.id]);
          setTagInput('');
        } else if (!existingTag) {
          // Create new tag
          try {
            setIsCreatingTag(true);
            const newTag = await apiService.createTag(tagName);
            setTags(prev => [...prev, newTag]);
            setSelectedTags(prev => [...prev, newTag.id]);
            setTagInput('');
            toast.success(`Tag "${tagName}" created successfully!`);
          } catch (error) {
            console.error('Error creating tag:', error);
            toast.error('Failed to create tag. Please try again.');
          } finally {
            setIsCreatingTag(false);
          }
        }
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    debugger
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        tagIds: selectedTags,
        isPublished: formData.isPublished,
        featuredImageId: selectedImageId || undefined
      };

      const createdPost = await apiService.createPost(postData);
      
      toast.success('Blog post created successfully!');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        categoryId: formData.categoryId,
        tagIds: selectedTags,
        isPublished: false,
        featuredImageId: selectedImageId || undefined
      };

      await apiService.createPost(postData);
      
      toast.success('Draft saved successfully!');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="create-blog-page" className="">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create New Blog Post</h2>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/blog"
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-button font-medium hover:bg-gray-200 transition-colors whitespace-nowrap flex items-center space-x-2"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                </div>
                <span>Back to List</span>
              </Link>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 space-y-8 bg-white p-7">
                <div>
                  <label className="block text- font-bold  text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter blog post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    name="excerpt"
                    rows={3}
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Write a brief summary of your post..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <ReactQuill
                      value={formData.content}
                      onChange={handleContentChange}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Write your blog content here..."
                      className="h-64"
                      theme="snow"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Use the toolbar above to format your content with rich text options.</p>
                </div>
              </div>

              <div className="col-span-1 space-y-8 bg-white p-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="relative aspect-video bg-gray-50 rounded-lg overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-12 h-12 flex items-center justify-center text-gray-400 mb-2">
                            <FontAwesomeIcon icon={faImage} className="text-3xl" />
                          </div>
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm text-left flex items-center justify-between bg-white disabled:opacity-50"
                    >
                      <span>
                        {isLoading 
                          ? 'Loading categories...'
                          : formData.categoryId 
                            ? categories.find(c => c.id === formData.categoryId)?.name || 'Select category'
                            : 'Select category'
                        }
                      </span>
                      <div className="w-5 h-5 flex items-center justify-center">
                        <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                      </div>
                    </button>
                    {showCategoryDropdown && !isLoading && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <div className="py-2">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, categoryId: category.id }));
                                setShowCategoryDropdown(false);
                              }}
                              className="category-option w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="border border-gray-300 rounded-lg p-2">
                    <div className="flex flex-wrap gap-2 mb-2" id="selected-tags">
                      {selectedTags.map((tagId) => {
                        const tag = tags.find(t => t.id === tagId);
                        return tag ? (
                          <div key={tagId} className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                            
                            <FontAwesomeIcon icon={faTag} className="w-2 text-gray-700 " />
                            <span>{tag.name}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tagId)}
                              className="w-3 h-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                              <FontAwesomeIcon icon={faTimes} className="w-2 h-2" />
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                    <div className="flex items-center">
                      <input
                        ref={tagInputRef}
                        type="text"
                        id="tag-input"
                        value={tagInput}
                        onChange={handleTagInput}
                        onKeyDown={handleTagKeyDown}
                        disabled={isCreatingTag}
                        className="flex-1 border-none outline-none text-sm disabled:opacity-50 tag-input"
                        placeholder={isCreatingTag ? "Creating tag..." : "Add tags..."}
                      />
                      {isCreatingTag && (
                        <div className="ml-2">
                          <FontAwesomeIcon icon={faSpinner} className="w-4 h-4 text-blue-600 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-700">Publishing</h3>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center space-x-1"
                      >
                        <span>{formData.isPublished ? 'Published' : 'Draft'}</span>
                        <div className="w-4 h-4 flex items-center justify-center">
                          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
                        </div>
                      </button>
                      {showStatusDropdown && (
                        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, isPublished: false }));
                                setShowStatusDropdown(false);
                              }}
                              className="status-option w-full px-4 py-2 text-left text-xs hover:bg-gray-100"
                            >
                              Draft
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, isPublished: true }));
                                setShowStatusDropdown(false);
                              }}
                              className="status-option w-full px-4 py-2 text-left text-xs hover:bg-gray-100"
                            >
                              Published
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      disabled={isSubmitting}
                      className="px-6 py-3 text-gray-700 bg-gray-200 rounded-button font-medium hover:bg-gray-300 transition-colors whitespace-nowrap !rounded-button disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : 'Save as Draft'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-primary text-white rounded-button font-medium hover:bg-blue-600 transition-colors whitespace-nowrap !rounded-button disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 