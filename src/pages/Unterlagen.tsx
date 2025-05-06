
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, CheckCircle, AlertCircle, HelpCircle, ArrowDown, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Unterlagen = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  
  useEffect(() => {
    // For now we'll use this seed data, but will replace with Supabase once integrated
    const seedData = [
      {
        id: 1,
        title: "Application Form Template",
        description: "Standard application form template that can be used for most Studienkollegs",
        file_url: "",
        visible: true,
        category: "essential"
      },
      {
        id: 2,
        title: "German Translation Guidelines",
        description: "Official requirements for document translations including certified translator contact information",
        file_url: "",
        visible: true,
        category: "reference"
      },
      {
        id: 3,
        title: "Baccalauréat Document Checklist",
        description: "Complete checklist for preparing your Moroccan Baccalauréat for application",
        file_url: "",
        visible: true,
        category: "essential"
      },
      {
        id: 4,
        title: "Financial Proof Templates",
        description: "Templates and examples for providing proof of financial resources (blocked account documents, sponsorship letters)",
        file_url: "",
        visible: true,
        category: "essential"
      },
      {
        id: 5,
        title: "Motivation Letter Example",
        description: "Example motivation letter for Studienkolleg applications with tips and structure guidance",
        file_url: "",
        visible: true,
        category: "templates"
      },
      {
        id: 6,
        title: "CV/Resume Template for Students",
        description: "Professionally designed CV template tailored for Moroccan students applying to German institutions",
        file_url: "",
        visible: true,
        category: "templates"
      },
      {
        id: 7,
        title: "Health Insurance Information",
        description: "Guide to health insurance requirements for Moroccan students in Germany, including recommended providers",
        file_url: "",
        visible: true,
        category: "reference"
      },
      {
        id: 8,
        title: "Visa Application Checklist",
        description: "Complete checklist of documents required for German student visa applications at the German embassy in Morocco",
        file_url: "",
        visible: true,
        category: "essential"
      }
    ];
    
    setDocuments(seedData);
    setFilteredDocuments(seedData);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchTerm, documents]);

  const filterByCategory = (category) => {
    if (category === "all") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(doc => doc.category === category);
      setFilteredDocuments(filtered);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="stk-hero py-12">
        <div className="stk-container">
          <h1 className="text-4xl font-bold mb-4">Required Documents</h1>
          <p className="text-xl max-w-2xl">
            Complete guide to all documents needed for Studienkolleg applications, with templates and examples
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="stk-container py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 py-6"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all" onClick={() => filterByCategory("all")}>All</TabsTrigger>
                <TabsTrigger value="essential" onClick={() => filterByCategory("essential")}>Essential</TabsTrigger>
                <TabsTrigger value="templates" onClick={() => filterByCategory("templates")}>Templates</TabsTrigger>
                <TabsTrigger value="reference" onClick={() => filterByCategory("reference")}>Reference</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 text-sm flex-wrap">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Essential documents</span>
                </div>
                <div className="flex items-center">
                  <FileDown className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Downloadable templates</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span>Must be certified/notarized</span>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Reference information</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Document List */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No documents found matching your search.</p>
            <Button 
              className="mt-4 stk-btn-primary" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 
                        ${doc.category === 'essential' ? 'bg-green-100 text-green-800' : 
                        doc.category === 'templates' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                      >
                        {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                      </span>
                      <CardTitle>{doc.title}</CardTitle>
                      <CardDescription className="mt-2">{doc.description}</CardDescription>
                    </div>
                    <div className="ml-4">
                      {doc.category === 'essential' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {doc.category === 'templates' && <FileDown className="h-5 w-5 text-blue-500" />}
                      {doc.category === 'reference' && <HelpCircle className="h-5 w-5 text-yellow-500" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={doc.file_url ? "default" : "outline"} 
                    className={doc.file_url ? "w-full stk-btn-primary" : "w-full"}
                    disabled={!doc.file_url}
                  >
                    {doc.file_url ? (
                      <>
                        <FileDown className="mr-2 h-4 w-4" /> 
                        Download Template
                      </>
                    ) : (
                      "Documentation Only"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Additional Information */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do all documents need to be translated?</AccordionTrigger>
              <AccordionContent>
                Yes, all documents that are not in German or English must be translated by a certified translator. The translation must be officially certified and should be attached to a copy of the original document.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where can I find certified translators in Morocco?</AccordionTrigger>
              <AccordionContent>
                You can find certified translators at the German Embassy in Rabat or Consulate in Casablanca. Additionally, there are many translation offices in major cities like Rabat, Casablanca, Tangier, and Marrakech that are recognized by the German authorities.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I prove my financial resources?</AccordionTrigger>
              <AccordionContent>
                The most common way is to open a blocked account (Sperrkonto) in Germany with approximately 11,000 euros. Alternatively, you can provide a formal obligation (Verpflichtungserklärung) from a sponsor in Germany, or a scholarship confirmation letter if you have received a scholarship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is an authenticated copy?</AccordionTrigger>
              <AccordionContent>
                An authenticated copy is a photocopy of an original document that has been certified by an authorized authority. In Morocco, you can get documents authenticated at the German Embassy or Consulate, or at government administration offices (for documents that will be later apostilled).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Do I need to bring original documents to Germany?</AccordionTrigger>
              <AccordionContent>
                Yes, it's highly recommended to bring all original documents with you to Germany. Even if you've submitted certified copies for your application, German authorities may request to see the originals during registration at the university or residence permit application.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Document Process */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Document Preparation Process</h2>
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              <div className="relative flex flex-col md:flex-row">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">Step 1: Gather Original Documents</h3>
                  <p className="mt-2 text-gray-600">
                    Collect all your original documents: Baccalauréat, transcripts, birth certificate, passport, and language certificates.
                  </p>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform -translate-x-1/2">
                  <span className="font-bold">1</span>
                </div>
                <div className="flex-1 md:pl-8">
                  <Card className="bg-accent border-0">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold">Required for this step:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Original Baccalauréat certificate and transcripts</li>
                        <li>Birth certificate (less than 6 months old)</li>
                        <li>Valid passport</li>
                        <li>German language certificate (B1/B2)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="relative flex flex-col md:flex-row">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <Card className="bg-accent border-0">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold">Translation services:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use only certified translators</li>
                        <li>Keep original formatting where possible</li>
                        <li>Translation must be attached to a copy of the original</li>
                        <li>Translator's stamp and signature must be on each page</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform -translate-x-1/2">
                  <span className="font-bold">2</span>
                </div>
                <div className="flex-1 md:pl-8">
                  <h3 className="text-xl font-bold">Step 2: Get Certified Translations</h3>
                  <p className="mt-2 text-gray-600">
                    Have all non-German/non-English documents translated by a certified translator recognized by the German authorities.
                  </p>
                </div>
              </div>
              
              <div className="relative flex flex-col md:flex-row">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">Step 3: Prepare Additional Documents</h3>
                  <p className="mt-2 text-gray-600">
                    Prepare your motivation letter, CV, financial proof, and any other required documents based on your specific Studienkolleg requirements.
                  </p>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform -translate-x-1/2">
                  <span className="font-bold">3</span>
                </div>
                <div className="flex-1 md:pl-8">
                  <Card className="bg-accent border-0">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold">Focus on quality:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use our templates for professional documents</li>
                        <li>Be honest but highlight your strengths</li>
                        <li>Explain your motivation for studying in Germany</li>
                        <li>Have someone proofread your documents</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="relative flex flex-col md:flex-row">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <Card className="bg-accent border-0">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold">Submission methods:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Online application portals (most common)</li>
                        <li>Email (scan all documents as PDFs)</li>
                        <li>Postal mail (use registered mail with tracking)</li>
                        <li>Uni-Assist for multiple applications</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform -translate-x-1/2">
                  <span className="font-bold">4</span>
                </div>
                <div className="flex-1 md:pl-8">
                  <h3 className="text-xl font-bold">Step 4: Submit Your Application</h3>
                  <p className="mt-2 text-gray-600">
                    Submit your complete application package to your chosen Studienkollegs before the deadline. Different schools have different submission methods.
                  </p>
                </div>
              </div>
              
              <div className="relative flex flex-col md:flex-row">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-bold">Step 5: Apply for Visa</h3>
                  <p className="mt-2 text-gray-600">
                    After receiving your acceptance letter, prepare your visa application with all required documents and schedule an appointment at the German Embassy.
                  </p>
                </div>
                <div className="hidden md:block absolute left-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center transform -translate-x-1/2">
                  <span className="font-bold">5</span>
                </div>
                <div className="flex-1 md:pl-8">
                  <Card className="bg-accent border-0">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold">Visa documents:</h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Acceptance letter from the Studienkolleg</li>
                        <li>Proof of financial resources</li>
                        <li>Health insurance</li>
                        <li>Passport-sized biometric photos</li>
                        <li>Visa application forms</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need more assistance with your documents?</h2>
          <p className="mb-8 text-lg">
            Our community of former Studienkolleg students can help guide you through the process.
          </p>
          <Link to="/uber-uns">
            <Button className="stk-btn-primary">
              Contact Us for Help
            </Button>
          </Link>
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

export default Unterlagen;
