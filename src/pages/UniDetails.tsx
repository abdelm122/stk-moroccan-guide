
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Globe, MapPin, Calendar, User, Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const UniDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch university data from Supabase
        const { data, error } = await supabase
          .from('universities')
          .select(`
            id,
            name,
            image_url,
            type,
            description,
            location,
            university_details (
              language_requirements,
              application_method,
              application_deadline,
              application_test_date,
              address,
              email,
              website_url,
              bundesland,
              status,
              kurse
            )
          `)
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching university details:', error);
          toast({
            title: "Error fetching university details",
            description: error.message,
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        if (!data) {
          console.log("No university found with ID:", id);
          setLoading(false);
          return;
        }
        
        // Transform data
        const transformedData = {
          id: data.id,
          name: data.name,
          registration: data.university_details?.[0]?.application_method || "Information not available",
          level: data.university_details?.[0]?.language_requirements || "B2",
          bewerbung_ws: data.university_details?.[0]?.application_deadline?.split(',')[0] || "Not specified",
          bewerbung_ss: data.university_details?.[0]?.application_deadline?.split(',')[1] || "Not specified",
          aufnahme_ws: data.university_details?.[0]?.application_test_date?.split(',')[0] || "Not specified",
          aufnahme_ss: data.university_details?.[0]?.application_test_date?.split(',')[1] || "Not specified",
          adresse: data.university_details?.[0]?.address || "Address not available",
          email: data.university_details?.[0]?.email || "Email not available",
          photo_url: data.image_url || "https://images.unsplash.com/photo-1592853598064-0029ebd8de92",
          more_info: data.university_details?.[0]?.website_url || "#"
        };
        
        console.log("Fetched university details:", transformedData);
        setUniversity(transformedData);
      } catch (err) {
        console.error('Unexpected error:', err);
        toast({
          title: "Failed to load university details",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchUniversityDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="stk-container py-16">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-gray-600">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="stk-container py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">University not found</h2>
        <p className="mb-8">The university you are looking for might have been removed or doesn't exist.</p>
        <Link to="/">
          <Button className="stk-btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="stk-hero py-8">
        <div className="stk-container">
          <Link to="/" className="text-white hover:underline inline-flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to universities
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{university.name}</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="stk-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Image and Contact */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={university.photo_url} 
                alt={university.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <Card>
              <CardContent className="space-y-4 pt-6">
                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-secondary flex-shrink-0 mt-1" />
                  <span>{university.adresse}</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                  <a href={`mailto:${university.email}`} className="text-primary hover:underline">
                    {university.email}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                  <a 
                    href={university.more_info}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    Official Website
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Details */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Registration Information</h2>
                    <p className="arabic font-semibold text-lg">{university.registration}</p>
                    <div className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Language Level: {university.level}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-xl font-bold mb-4">Application Periods</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 bg-accent">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 mr-2 text-secondary" />
                          <h4 className="font-semibold">Winter Semester (WS)</h4>
                        </div>
                        <p><strong>Bewerbung:</strong> {university.bewerbung_ws}</p>
                        <p><strong>Aufnahmetest:</strong> {university.aufnahme_ws}</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-accent">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 mr-2 text-secondary" />
                          <h4 className="font-semibold">Summer Semester (SS)</h4>
                        </div>
                        <p><strong>Bewerbung:</strong> {university.bewerbung_ss || 'Not available'}</p>
                        <p><strong>Aufnahmetest:</strong> {university.aufnahme_ss || 'Not available'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-xl font-bold mb-4">Required Documents</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Application form (from university website)</li>
                      <li>High school diploma (Baccalauréat) with translation</li>
                      <li>Passport (valid for entire study period)</li>
                      <li>German language certificate ({university.level})</li>
                      <li>Proof of application fee payment (if applicable)</li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/unterlagen" className="text-primary hover:underline inline-flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        View full document requirements
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-12">
        <div className="stk-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">STK Community</h3>
              <p>Helping Moroccan students navigate their path to German universities.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/uber-uns" className="hover:underline">About Us</Link></li>
                <li><Link to="/informationen" className="hover:underline">Information</Link></li>
                <li><Link to="/unterlagen" className="hover:underline">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p>Created by Abdelmounaim Oulad Ali</p>
              <div className="flex gap-4 mt-4">
                <a href="#" aria-label="Facebook" className="hover:text-secondary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-secondary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} STK Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniDetails;
