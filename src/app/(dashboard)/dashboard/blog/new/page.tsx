'use client';

import { useState, useRef, useEffect } from 'react';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { apiService, CategoryDto, TagDto } from '@/services/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';

import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
} from '@mui/material';

import {
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Publish as PublishIcon,
  Tag as TagIcon,
  Close as CloseIcon,

} from '@mui/icons-material';
import React from 'react';
import { ListIcon } from 'lucide-react';
import { ContentType } from '@/components/content/contentType.model';
import ListContent from '@/components/content/listContent';
import QuoteContent from '@/components/content/quoteContent';
import TableContent from '@/components/content/tableContent';
// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Box sx={{ height: 256, bgcolor: 'grey.100', borderRadius: 2, animation: 'pulse 2s infinite' }}></Box>
});
const options = [
  { type: ContentType.LIST, name: 'List', icon: <ListIcon className='w-5 dark:text-white' /> },
  { type: ContentType.QUOTE, name: 'Quote', icon: <FormatQuoteIcon className='w-4 dark:text-white' style={{ width: '20px', height: '20px' }} /> },
  { type: ContentType.TABLE, name: 'Table', icon: <TableChartOutlinedIcon className='w-4 dark:text-white ' style={{ width: '20px', height: '20px' }} /> },
  { type: ContentType.EMBEDED, name: 'Embeded', icon: <BookmarkAddIcon className='w-5 dark:text-white' style={{ width: '20px', height: '20px' }} /> },
  { type: ContentType.ARTICLE, name: 'Article', icon: <ArticleOutlinedIcon className='w-5 dark:text-white' style={{ width: '20px', height: '20px' }} /> },
  { type: ContentType.IMAGE, name: 'Image', icon: <AddPhotoAlternateOutlinedIcon className=' dark:text-white' style={{ width: '20px', height: '20px' }} /> }
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    isPublished: false
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
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
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],        
      ['blockquote', 'code-block'],
      ['link', 'image',],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],   
      [{ 'indent': '-1' }, { 'indent': '+1' }],        
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'font': [ 'Times New Roman',  'Poppins', 'Open Sans'] }],
      [{ 'align': ['center', 'right', 'justify','left'] }],

      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image',
    'table'

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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    type: ContentType
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    setContentTypes(prev => [...prev, type]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
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

    if (!user?.id) {
      toast.error('You must be logged in to create a blog post');
      return;
    }

    try {
      setIsSubmitting(true);

      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        categoryId: formData.categoryId,
        tagIds: selectedTags,
        isPublished: formData.isPublished,
        featuredImageId: selectedImageId || undefined,
        authorId: user.id
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
    debugger
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!user?.id) {
      toast.error('You must be logged in to create a blog post');
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
        featuredImageId: selectedImageId || undefined,
        authorId: user.id
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
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Create New Blog Post
        </Typography>
        <Button
          component={Link}
          href="/dashboard/blog"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back to List
        </Button>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Main Content */}
          <Box sx={{ flex: { md: 2 } }} >
            <Stack spacing={3}>
              {/* Title */}
              <Card className="p-8 pb-2 dark:bg-gray-800" >
                <CardContent className="">
                  <div className="mb-8">
                    <TextField
                      label="Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      fullWidth
                      required
                      placeholder="Enter your blog post title..."
                    />
                  </div>


                  {/* Excerpt */}
                  <div className="mb-8">
                    <TextField
                      label="Excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      fullWidth
                      placeholder="Write a brief summary of your post..."
                    />
                  </div>

                  <Typography variant="h6" gutterBottom>
                    Featured Image
                  </Typography>
                  <div className="mb-8">
                    <Box
                    className="dark:border-gray-600 dark:hover:border-gray-500"
                      sx={{
                        border: '2px dashed',
                        borderColor: 'grey.300',
                        borderRadius: 2,
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Box sx={{ position: 'relative', aspectRatio: '16/5', bgcolor: 'grey.50', borderRadius: 2, overflow: 'hidden', marginBottom: "rem" }}>
                        {previewImage ? (
                          <Box
                            component="img"
                            src={previewImage}
                            alt="Preview"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <Box className="dark:bg-gray-800" sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ImageIcon sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Click to upload or drag and drop
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              PNG, JPG up to 2MB
                            </Typography>
                          </Box>
                        )}
                        {isUploadingImage && (
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(0,0,0,0.5)' }}>
                            <CircularProgress />
                          </Box>
                        )}
                      </Box>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </div>

                  {/* Content */}
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Content
                    </Typography>
                    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                      <div className={`quill-editor ${isDark ? 'dark' : ''}`}>
                        <ReactQuill
                          value={formData.content}
                          onChange={handleContentChange}
                          modules={quillModules}
                          formats={quillFormats}
                          placeholder="Write your blog content here..."
                          style={{ height: '300px' }}
                          theme="snow"
                        />
                      </div>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Use the toolbar above to format your content with rich text options.
                    </Typography>
                  </Box>

                  {
                    contentTypes.map((type) => {
                      const renderContent = () => {
                        switch (type) {
                          case ContentType.LIST:
                            return (
                              <>
                                <div className="mt-8">
                                  <ListContent />
                                </div>
                              </>
                            );
                          case ContentType.QUOTE:
                            return <QuoteContent quote="Your quote text here" />;
                          case ContentType.EMBEDED:
                            return <h1>Embeded</h1>;
                          case ContentType.ARTICLE:
                            return <h1>Article</h1>;
                          case ContentType.IMAGE:
                            return <h1 >Image</h1>;
                          case ContentType.TABLE:
                            return <TableContent/>;
                          default:
                            return <h1>Unknown</h1>;
                        }
                      };

                      return (
                        <div key={type}>
                          {renderContent()}
                        </div>
                      );
                    })
                  }

                  <div className="flex justify-end">
                    <IconButton color="primary" ref={anchorRef} onClick={handleToggle} aria-label="add to shopping cart">
                      <AddIcon />
                    </IconButton>
                    <Popper
                      sx={{ zIndex: 1 }}
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper className='dark:bg-gray-800'>
                            <ClickAwayListener className="dark:bg-gray-700" onClickAway={handleClose}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option.name}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index, option.type)}
                                  >
                                    <div className="flex gap-2 px-1 w-36 items-center">
                                      <span className="flex-shrink-0 text-gray-700" >
                                        {option.icon}
                                      </span>
                                      <span className='text-sm'> {option.name}</span>
                                    </div>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </CardContent>
              </Card>
            </Stack>
          </Box>

          {/* Sidebar */}
          <Box sx={{ flex: { md: 1 } }}>
            <Stack spacing={3}>
              {/* Featured Image */}

              {/* Category */}
              <Card className='poppin-inner dark:bg-gray-800 '>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Category
                  </Typography>
                  <FormControl fullWidth disabled={isLoading}>
                    <InputLabel>Select category</InputLabel>
                    <Select
                      value={formData.categoryId}
                      label="Select category"
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="dark:bg-gray-800">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tags
                  </Typography>
                  <Box className="border-gray-300 dark:border-gray-500" sx={{ border: 1 , borderRadius: 1, p: 1 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {selectedTags.map((tagId) => {
                        const tag = tags.find(t => t.id === tagId);
                        return tag ? (
                          <Chip
                            key={tagId}
                            label={tag.name}
                            size="small"
                            onDelete={() => removeTag(tagId)}
                            deleteIcon={<CloseIcon />}
                            icon={<TagIcon />}
                          />
                        ) : null;
                      })}
                    </Box>
                    <TextField
                      ref={tagInputRef}
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyDown={handleTagKeyDown}
                      disabled={isCreatingTag}
                      placeholder={isCreatingTag ? "Creating tag..." : "Add tags..."}
                      fullWidth
                      size="small"
                      InputProps={{
                        endAdornment: isCreatingTag ? <CircularProgress size={16} /> : null,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Publishing */}
              <Card className='dark:bg-gray-800'>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Publishing
                    </Typography>
                    <FormControl size="small">
                      <Select
                        value={formData.isPublished ? 'published' : 'draft'}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === 'published' }))}
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={handleSaveDraft}
                      disabled={isSubmitting}
                      startIcon={<SaveIcon />}
                    >
                      {isSubmitting ? 'Saving...' : 'Save as Draft'}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      startIcon={<PublishIcon />}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box >
  );
} 