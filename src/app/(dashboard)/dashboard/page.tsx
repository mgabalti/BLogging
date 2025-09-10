'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,

  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Article as ArticleIcon,
  Drafts as DraftIcon,
  RemoveRedEye as EyeIcon,
} from '@mui/icons-material';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with Blogging',
      status: 'published',
      views: 1234,
      publishedAt: '2024-01-15',
      excerpt: 'Learn the basics of creating engaging blog content...',
      author: 'John Doe',
      category: 'Tutorial'
    },
    {
      id: 2,
      title: 'Web Development Tips',
      status: 'published',
      views: 856,
      publishedAt: '2024-01-10',
      excerpt: 'Essential tips for modern web development...',
      author: 'Jane Smith',
      category: 'Development'
    },
    {
      id: 3,
      title: 'SEO Best Practices',
      status: 'draft',
      views: 0,
      publishedAt: null,
      excerpt: 'How to optimize your blog for search engines...',
      author: 'Mike Johnson',
      category: 'Marketing'
    }
  ];

  const stats = [
    { 
      name: 'Total Posts', 
      value: '12', 
      color: 'primary.main',
      icon: <ArticleIcon />,
      trend: '+5%',
      trendColor: 'success.main'
    },
    { 
      name: 'Published', 
      value: '8', 
      color: 'success.main',
      icon: <TrendingUpIcon />,
      trend: '+12%',
      trendColor: 'success.main'
    },
    { 
      name: 'Drafts', 
      value: '4', 
      color: 'warning.main',
      icon: <DraftIcon />,
      trend: '-2%',
      trendColor: 'error.main'
    },
    { 
      name: 'Total Views', 
      value: '1,234', 
      color: 'secondary.main',
      icon: <EyeIcon />,
      trend: '+8%',
      trendColor: 'success.main'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'published' ? 'success' : 'warning';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Welcome back! Here's what's happening with your blog.
        </Typography>
       
      </Box>
      
      {/* Stats Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.name} sx={{ height: '100%' }} className='dark:bg-gray-900'>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                  {stat.icon}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.name}
                  </Typography>
                </Box>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ color: stat.trendColor, fontWeight: 'bold' }}
              >
                {stat.trend} from last month
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Recent Blog Posts */}
      <Card className='dark:bg-gray-800'>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Recent Blog Posts
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table className="dark:bg-gray-700">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.excerpt}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={post.status}
                        color={getStatusColor(post.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VisibilityIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {post.views}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {post.publishedAt ? formatDate(post.publishedAt) : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create New Blog Modal */}
      <Dialog 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Blog Post</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              placeholder="Enter blog title..."
            />
            <TextField
              label="Category"
              fullWidth
              placeholder="Enter category..."
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              fullWidth
              placeholder="Write your blog content..."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setShowCreateModal(false)}>
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 