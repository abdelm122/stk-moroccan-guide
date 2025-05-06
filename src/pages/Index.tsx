
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [b1Filter, setB1Filter] = useState(false);
  const [b2Filter, setB2Filter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        
        // Fetch data from Supabase
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
          `);
        
        if (error) {
          console.error('Error fetching data:', error);
          toast({
            title: "Error fetching universities",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        // Transform data to match the format expected by the UI
        const transformedData = data.map(uni => ({
          id: uni.id,
          name: uni.name,
          registration: uni.university_details?.[0]?.application_method || "Information not available",
          level: uni.university_details?.[0]?.language_requirements || "B2",
          bewerbung_ws: uni.university_details?.[0]?.application_deadline?.split(',')[0] || "Not specified",
          bewerbung_ss: uni.university_details?.[0]?.application_deadline?.split(',')[1] || "Not specified",
          aufnahme_ws: uni.university_details?.[0]?.application_test_date?.split(',')[0] || "Not specified",
          aufnahme_ss: uni.university_details?.[0]?.application_test_date?.split(',')[1] || "Not specified",
          adresse: uni.university_details?.[0]?.address || "Address not available",
          email: uni.university_details?.[0]?.email || "Email not available",
          photo_url: uni.image_url || "https://images.unsplash.com/photo-1592853598064-0029ebd8de92",
          more_info: uni.university_details?.[0]?.website_url || "#"
        }));
        
        console.log("Fetched universities:", transformedData);
        setUniversities(transformedData);
        setFilteredUniversities(transformedData);
      } catch (err) {
        console.error('Unexpected error:', err);
        toast({
          title: "Failed to load data",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [searchTerm, b1Filter, b2Filter, universities]);

  const filterUniversities = () => {
    let filtered = universities;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by language level
    if (b1Filter && !b2Filter) {
      filtered = filtered.filter(uni => uni.level === "B1");
    } else if (!b1Filter && b2Filter) {
      filtered = filtered.filter(uni => uni.level === "B2");
    } else if (b1Filter && b2Filter) {
      // Both checkboxes selected, include both B1 and B2
      filtered = filtered.filter(uni => uni.level === "B1" || uni.level === "B2");
    }
    
    setFilteredUniversities(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterUniversities();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="stk-hero py-16 mb-8">
        <div className="stk-container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">STK Community</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Your complete guide to Studienkollegs in Germany for Moroccan students
            </p>
            <div className="w-full max-w-lg">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10 py-6"
                    placeholder="Search by university name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="secondary" className="stk-btn-secondary">Search</Button>
              </form>
              <div className="flex items-center gap-6 mt-4 justify-center">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="b1" 
                    checked={b1Filter}
                    onCheckedChange={(checked) => setB1Filter(!!checked)}
                  />
                  <Label htmlFor="b1">B1 Level</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="b2" 
                    checked={b2Filter}
                    onCheckedChange={(checked) => setB2Filter(!!checked)}
                  />
                  <Label htmlFor="b2">B2 Level</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Universities Section */}
      <div className="stk-container flex-1 pb-16">
        <h2 className="text-3xl font-bold mb-8">Available Studienkollegs</h2>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-gray-600">Loading universities...</p>
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No universities found matching your criteria.</p>
            <Button 
              className="mt-4 stk-btn-primary" 
              onClick={() => {
                setSearchTerm('');
                setB1Filter(false);
                setB2Filter(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni) => (
              <Link to={`/uni/${uni.id}`} key={uni.id} className="stk-card group">
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={uni.photo_url} 
                      alt={uni.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{uni.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${uni.level === "B1" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                        {uni.level}
                      </span>
                      <span className="arabic text-gray-600">{uni.registration}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between mt-auto">
                    <p className="text-sm text-gray-600">{uni.bewerbung_ws}</p>
                    <Button variant="ghost" className="hover:bg-accent">View Details</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-primary text-white py-8">
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

export default Index;
