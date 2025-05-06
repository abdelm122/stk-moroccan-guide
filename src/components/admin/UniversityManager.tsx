
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function UniversityManager() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          university_details(*)
        `)
        .order('name');
        
      if (error) throw error;
      
      if (data) {
        setUniversities(data);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
      toast.error("Failed to load universities");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (university: any) => {
    setSelectedUniversity(university);
    setFormData({
      ...university,
      ...university.university_details
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Separate the university and university_details fields
      const universityFields = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
        type: formData.type,
        image_url: formData.image_url
      };
      
      const detailsFields = {
        address: formData.address,
        email: formData.email,
        website_url: formData.website_url,
        bundesland: formData.bundesland,
        kurse: formData.kurse,
        application_method: formData.application_method,
        application_deadline: formData.application_deadline,
        application_test_date: formData.application_test_date,
        language_requirements: formData.language_requirements,
        status: formData.status
      };
      
      // Update university table
      const { error: universityError } = await supabase
        .from('universities')
        .update(universityFields)
        .eq('id', selectedUniversity.id);
        
      if (universityError) throw universityError;
      
      // Update university_details table
      const { error: detailsError } = await supabase
        .from('university_details')
        .update(detailsFields)
        .eq('university_id', selectedUniversity.id);
        
      if (detailsError) throw detailsError;
      
      toast.success("University updated successfully");
      fetchUniversities(); // Refresh the list
      
    } catch (error: any) {
      console.error("Error updating university:", error);
      toast.error(error.message || "Failed to update university");
    }
  };

  return (
    <Card className="w-full">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Universities List</h2>
          <Button variant="outline" onClick={fetchUniversities} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
        
        {loading ? (
          <p className="text-center py-4">Loading universities...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No universities found
                  </TableCell>
                </TableRow>
              ) : (
                universities.map((university) => (
                  <TableRow key={university.id}>
                    <TableCell className="font-medium">{university.name}</TableCell>
                    <TableCell>{university.location}</TableCell>
                    <TableCell>{university.type}</TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" onClick={() => handleEdit(university)}>Edit</Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Edit University</SheetTitle>
                            <SheetDescription>
                              Make changes to university information here.
                            </SheetDescription>
                          </SheetHeader>
                          
                          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-medium">Name</label>
                              <Input 
                                id="name" 
                                name="name" 
                                value={formData.name || ''} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="description" className="text-sm font-medium">Description</label>
                              <Textarea 
                                id="description" 
                                name="description" 
                                value={formData.description || ''} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="location" className="text-sm font-medium">Location</label>
                              <Input 
                                id="location" 
                                name="location" 
                                value={formData.location || ''} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="type" className="text-sm font-medium">Type</label>
                              <Input 
                                id="type" 
                                name="type" 
                                value={formData.type || ''} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="image_url" className="text-sm font-medium">Image URL</label>
                              <Input 
                                id="image_url" 
                                name="image_url" 
                                value={formData.image_url || ''} 
                                onChange={handleChange} 
                                required 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="bundesland" className="text-sm font-medium">Bundesland</label>
                              <Input 
                                id="bundesland" 
                                name="bundesland" 
                                value={formData.bundesland || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="address" className="text-sm font-medium">Address</label>
                              <Textarea 
                                id="address" 
                                name="address" 
                                value={formData.address || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">Email</label>
                              <Input 
                                id="email" 
                                name="email" 
                                value={formData.email || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="website_url" className="text-sm font-medium">Website URL</label>
                              <Input 
                                id="website_url" 
                                name="website_url" 
                                value={formData.website_url || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="kurse" className="text-sm font-medium">Kurse</label>
                              <Textarea 
                                id="kurse" 
                                name="kurse" 
                                value={formData.kurse || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="application_method" className="text-sm font-medium">Application Method</label>
                              <Textarea 
                                id="application_method" 
                                name="application_method" 
                                value={formData.application_method || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="application_deadline" className="text-sm font-medium">Application Deadline</label>
                              <Input 
                                id="application_deadline" 
                                name="application_deadline" 
                                value={formData.application_deadline || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="application_test_date" className="text-sm font-medium">Application Test Date</label>
                              <Input 
                                id="application_test_date" 
                                name="application_test_date" 
                                value={formData.application_test_date || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="language_requirements" className="text-sm font-medium">Language Requirements</label>
                              <Textarea 
                                id="language_requirements" 
                                name="language_requirements" 
                                value={formData.language_requirements || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor="status" className="text-sm font-medium">Status</label>
                              <Input 
                                id="status" 
                                name="status" 
                                value={formData.status || ''} 
                                onChange={handleChange} 
                              />
                            </div>
                            
                            <div className="pt-4 flex justify-end space-x-2">
                              <Button type="submit" className="stk-btn-primary">Save Changes</Button>
                            </div>
                          </form>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
}
