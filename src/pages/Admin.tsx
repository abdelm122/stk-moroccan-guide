
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // For university management
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "Heidelberg",
      registration: "التسجيل أونلاين",
      level: "B2",
      bewerbung_ws: "1 Mai bis 30 Juni",
      bewerbung_ss: "November bis 15 Dezember",
      aufnahme_ws: "9/10",
      aufnahme_ss: "8/4",
      adresse: "Im Neuenheimer Feld 684, 69120 Heidelberg",
      email: "studienkolleg@uni-heidelberg.de",
      photo_url: "https://images.unsplash.com/photo-1522661067900-ab829854a57f",
      more_info: "https://www.isz.uni-heidelberg.de/e_index.html"
    },
    {
      id: 2,
      name: "Karlsruhe institut",
      registration: "التسجيل اونلاين",
      level: "B1",
      bewerbung_ws: "bis 15 Juli",
      bewerbung_ss: "bis 15 Januar",
      aufnahme_ws: "Anfang September",
      aufnahme_ss: "Anfang Februar",
      adresse: "Adenauerring 2, 76131 Karlsruhe",
      email: "studienkolleg@kit.edu",
      photo_url: "https://images.unsplash.com/photo-1562774053-701939374585",
      more_info: "https://www.stk.kit.edu/"
    }
  ]);
  const [currentUniversity, setCurrentUniversity] = useState({
    id: null,
    name: "",
    registration: "",
    level: "B1",
    bewerbung_ws: "",
    bewerbung_ss: "",
    aufnahme_ws: "",
    aufnahme_ss: "",
    adresse: "",
    email: "",
    photo_url: "",
    more_info: ""
  });
  
  // For blog management
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "How to Prepare for Aufnahmeprüfung",
      content: "The Aufnahmeprüfung (entrance examination) is a crucial step...",
      image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      created_at: "2023-05-15"
    },
    {
      id: 2,
      title: "Student Visa Application Process",
      content: "To study in Germany, Moroccan students need to apply for a student visa...",
      image_url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643",
      created_at: "2023-06-23"
    }
  ]);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: "",
    content: "",
    image_url: "",
  });
  
  // For documents management
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Application Form Template",
      description: "Standard application form template that can be used for most Studienkollegs",
      file_url: "",
      visible: true
    },
    {
      id: 2,
      title: "German Translation Guidelines",
      description: "Official requirements for document translations",
      file_url: "",
      visible: true
    }
  ]);
  const [currentDocument, setCurrentDocument] = useState({
    id: null,
    title: "",
    description: "",
    file_url: "",
    visible: true
  });

  const handleLogin = (e) => {
    e.preventDefault();
    
    // This will be replaced with actual Supabase auth once integrated
    if (email === "admin@stk-community.com" && password === "admin123") {
      setIsLoggedIn(true);
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
    
    // Supabase auth would look something like this:
    // const handleLogin = async (e) => {
    //   e.preventDefault();
    //   
    //   const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
    //   
    //   const { error } = await supabase.auth.signIn({
    //     email,
    //     password,
    //   });
    //   
    //   if (error) {
    //     toast.error(error.message);
    //   } else {
    //     setIsLoggedIn(true);
    //     toast.success("Login successful");
    //   }
    // }
  };

  // University CRUD operations
  const selectUniversity = (university) => {
    setCurrentUniversity({ ...university });
  };
  
  const clearUniversityForm = () => {
    setCurrentUniversity({
      id: null,
      name: "",
      registration: "",
      level: "B1",
      bewerbung_ws: "",
      bewerbung_ss: "",
      aufnahme_ws: "",
      aufnahme_ss: "",
      adresse: "",
      email: "",
      photo_url: "",
      more_info: ""
    });
  };
  
  const handleUniversitySubmit = (e) => {
    e.preventDefault();
    
    if (currentUniversity.id) {
      // Update existing university
      const updatedUniversities = universities.map(uni => 
        uni.id === currentUniversity.id ? { ...currentUniversity } : uni
      );
      setUniversities(updatedUniversities);
      toast.success("University updated successfully");
    } else {
      // Add new university
      const newId = Math.max(0, ...universities.map(uni => uni.id)) + 1;
      const newUniversity = { ...currentUniversity, id: newId };
      setUniversities([...universities, newUniversity]);
      toast.success("University added successfully");
    }
    
    clearUniversityForm();
  };
  
  const deleteUniversity = (id) => {
    if (window.confirm("Are you sure you want to delete this university?")) {
      setUniversities(universities.filter(uni => uni.id !== id));
      clearUniversityForm();
      toast.success("University deleted successfully");
    }
  };
  
  // Blog CRUD operations
  const selectBlog = (blog) => {
    setCurrentBlog({ ...blog });
  };
  
  const clearBlogForm = () => {
    setCurrentBlog({
      id: null,
      title: "",
      content: "",
      image_url: ""
    });
  };
  
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    
    if (currentBlog.id) {
      // Update existing blog
      const updatedBlogs = blogs.map(blog => 
        blog.id === currentBlog.id ? { ...currentBlog, created_at: blog.created_at } : blog
      );
      setBlogs(updatedBlogs);
      toast.success("Blog post updated successfully");
    } else {
      // Add new blog
      const newId = Math.max(0, ...blogs.map(blog => blog.id)) + 1;
      const newBlog = {
        ...currentBlog,
        id: newId,
        created_at: new Date().toISOString().split('T')[0]
      };
      setBlogs([...blogs, newBlog]);
      toast.success("Blog post added successfully");
    }
    
    clearBlogForm();
  };
  
  const deleteBlog = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
      clearBlogForm();
      toast.success("Blog post deleted successfully");
    }
  };
  
  // Document CRUD operations
  const selectDocument = (doc) => {
    setCurrentDocument({ ...doc });
  };
  
  const clearDocumentForm = () => {
    setCurrentDocument({
      id: null,
      title: "",
      description: "",
      file_url: "",
      visible: true
    });
  };
  
  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    
    if (currentDocument.id) {
      // Update existing document
      const updatedDocuments = documents.map(doc => 
        doc.id === currentDocument.id ? { ...currentDocument } : doc
      );
      setDocuments(updatedDocuments);
      toast.success("Document updated successfully");
    } else {
      // Add new document
      const newId = Math.max(0, ...documents.map(doc => doc.id)) + 1;
      const newDocument = { ...currentDocument, id: newId };
      setDocuments([...documents, newDocument]);
      toast.success("Document added successfully");
    }
    
    clearDocumentForm();
  };
  
  const deleteDocument = (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments(documents.filter(doc => doc.id !== id));
      clearDocumentForm();
      toast.success("Document deleted successfully");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="admin@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full stk-btn-primary">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            <p className="w-full">
              This area is restricted to administrators only.
              <br />
              <a href="/" className="text-primary hover:underline">
                Return to Homepage
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white p-4">
        <div className="stk-container flex justify-between items-center">
          <h1 className="text-xl font-bold">STK Community Admin</h1>
          <Button
            variant="outline"
            onClick={() => {
              setIsLoggedIn(false);
              setEmail('');
              setPassword('');
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      
      <div className="stk-container py-8">
        <Tabs defaultValue="universities" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Universities Tab */}
          <TabsContent value="universities">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* University Form */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentUniversity.id ? "Edit University" : "Add New University"}</CardTitle>
                    <CardDescription>
                      {currentUniversity.id 
                        ? `You are editing ${currentUniversity.name}`
                        : "Create a new university entry"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUniversitySubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="uni-name">University Name</Label>
                        <Input
                          id="uni-name"
                          value={currentUniversity.name}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            name: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-registration">Registration Method (Arabic)</Label>
                        <Input
                          id="uni-registration"
                          value={currentUniversity.registration}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            registration: e.target.value
                          })}
                          required
                          className="arabic"
                          dir="rtl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-level">Language Level</Label>
                        <select
                          id="uni-level"
                          className="w-full border border-gray-300 rounded-md p-2"
                          value={currentUniversity.level}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            level: e.target.value
                          })}
                          required
                        >
                          <option value="B1">B1</option>
                          <option value="B2">B2</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-bewerbung-ws">Application Winter Semester</Label>
                        <Input
                          id="uni-bewerbung-ws"
                          value={currentUniversity.bewerbung_ws}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            bewerbung_ws: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-bewerbung-ss">Application Summer Semester</Label>
                        <Input
                          id="uni-bewerbung-ss"
                          value={currentUniversity.bewerbung_ss}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            bewerbung_ss: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-aufnahme-ws">Entrance Exam Winter Semester</Label>
                        <Input
                          id="uni-aufnahme-ws"
                          value={currentUniversity.aufnahme_ws}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            aufnahme_ws: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-aufnahme-ss">Entrance Exam Summer Semester</Label>
                        <Input
                          id="uni-aufnahme-ss"
                          value={currentUniversity.aufnahme_ss}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            aufnahme_ss: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-adresse">Address</Label>
                        <Input
                          id="uni-adresse"
                          value={currentUniversity.adresse}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            adresse: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-email">Email</Label>
                        <Input
                          id="uni-email"
                          type="email"
                          value={currentUniversity.email}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            email: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-photo">Photo URL</Label>
                        <Input
                          id="uni-photo"
                          value={currentUniversity.photo_url}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            photo_url: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="uni-info">More Info URL</Label>
                        <Input
                          id="uni-info"
                          value={currentUniversity.more_info}
                          onChange={(e) => setCurrentUniversity({
                            ...currentUniversity,
                            more_info: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex-1 stk-btn-primary">
                          {currentUniversity.id ? "Update" : "Add"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={clearUniversityForm}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* University List */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Universities</CardTitle>
                    <CardDescription>
                      Manage Studienkollegs in the database
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {universities.map((university) => (
                        <div key={university.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{university.name}</h3>
                            <p className="text-sm text-gray-500">Level: {university.level}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              size="sm" 
                              onClick={() => selectUniversity(university)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive"
                              size="sm" 
                              onClick={() => deleteUniversity(university.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blog Form */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentBlog.id ? "Edit Blog Post" : "Add New Blog Post"}</CardTitle>
                    <CardDescription>
                      {currentBlog.id 
                        ? `You are editing "${currentBlog.title}"`
                        : "Create a new blog post"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="blog-title">Title</Label>
                        <Input
                          id="blog-title"
                          value={currentBlog.title}
                          onChange={(e) => setCurrentBlog({
                            ...currentBlog,
                            title: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="blog-content">Content</Label>
                        <Textarea
                          id="blog-content"
                          value={currentBlog.content}
                          onChange={(e) => setCurrentBlog({
                            ...currentBlog,
                            content: e.target.value
                          })}
                          rows={10}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="blog-image">Image URL</Label>
                        <Input
                          id="blog-image"
                          value={currentBlog.image_url}
                          onChange={(e) => setCurrentBlog({
                            ...currentBlog,
                            image_url: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex-1 stk-btn-primary">
                          {currentBlog.id ? "Update" : "Add"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={clearBlogForm}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Blog List */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                      Manage informative articles for students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{blog.title}</h3>
                            <p className="text-sm text-gray-500">Published: {blog.created_at}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              size="sm" 
                              onClick={() => selectBlog(blog)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive"
                              size="sm" 
                              onClick={() => deleteBlog(blog.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Document Form */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentDocument.id ? "Edit Document" : "Add New Document"}</CardTitle>
                    <CardDescription>
                      {currentDocument.id 
                        ? `You are editing "${currentDocument.title}"`
                        : "Create a new document entry"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDocumentSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doc-title">Title</Label>
                        <Input
                          id="doc-title"
                          value={currentDocument.title}
                          onChange={(e) => setCurrentDocument({
                            ...currentDocument,
                            title: e.target.value
                          })}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="doc-description">Description</Label>
                        <Textarea
                          id="doc-description"
                          value={currentDocument.description}
                          onChange={(e) => setCurrentDocument({
                            ...currentDocument,
                            description: e.target.value
                          })}
                          rows={4}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="doc-file">File URL (Optional)</Label>
                        <Input
                          id="doc-file"
                          value={currentDocument.file_url}
                          onChange={(e) => setCurrentDocument({
                            ...currentDocument,
                            file_url: e.target.value
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="doc-visible"
                          checked={currentDocument.visible}
                          onCheckedChange={(checked) => setCurrentDocument({
                            ...currentDocument,
                            visible: checked
                          })}
                        />
                        <Label htmlFor="doc-visible">Document is visible to users</Label>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex-1 stk-btn-primary">
                          {currentDocument.id ? "Update" : "Add"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={clearDocumentForm}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Document List */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Manage required documents information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{doc.title}</h3>
                              {!doc.visible && (
                                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                                  Hidden
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              size="sm" 
                              onClick={() => selectDocument(doc)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive"
                              size="sm" 
                              onClick={() => deleteDocument(doc.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
