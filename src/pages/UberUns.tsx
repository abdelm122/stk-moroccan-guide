
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UberUns = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="stk-hero py-12">
        <div className="stk-container text-center">
          <h1 className="text-4xl font-bold mb-4">Über Uns</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn more about the STK Community project and our mission to help Moroccan students
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="stk-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                STK Community was created by Abdelmounaim Oulad Ali to serve as a comprehensive resource 
                for Moroccan students who wish to pursue their higher education in Germany through the 
                Studienkolleg pathway.
              </p>
              <p className="text-lg mb-4">
                We understand that navigating the German education system can be challenging, especially 
                when dealing with applications, deadlines, language requirements, and entrance exams. Our 
                platform aims to simplify this process by providing accurate, up-to-date information 
                about various Studienkollegs across Germany.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">Comprehensive Database</h3>
                    <p>
                      Detailed information about Studienkollegs across Germany, including application 
                      periods, language requirements, and entrance exam dates.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">Application Guidance</h3>
                    <p>
                      Step-by-step guides on how to apply, what documents you need, and important deadlines 
                      to keep in mind.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">Document Requirements</h3>
                    <p>
                      Detailed lists of required documents, translation guidelines, and templates to help 
                      you prepare your application.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">Community Support</h3>
                    <p>
                      A platform where Moroccan students can find reliable information and resources 
                      tailored to their specific needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg mb-4">
                The idea for STK Community was born from personal experience. Having gone through the 
                challenging process of applying to Studienkollegs, our founder Abdelmounaim Oulad Ali 
                recognized the need for a centralized, reliable source of information specifically for 
                Moroccan students.
              </p>
              <p className="text-lg mb-4">
                What started as a small project to help friends and family has grown into a comprehensive 
                platform that assists hundreds of Moroccan students in pursuing their academic dreams in Germany.
              </p>
              <p className="text-lg">
                Our commitment is to continually update and expand our resources, ensuring that Moroccan 
                students have access to the most accurate and helpful information possible.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">About the Creator</h3>
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
                        alt="Abdelmounaim Oulad Ali" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">Abdelmounaim Oulad Ali</h4>
                    <p className="text-gray-600">Founder, STK Community</p>
                  </div>
                  <p className="text-sm">
                    Abdelmounaim is a former Studienkolleg student who successfully navigated the German 
                    education system. With a passion for helping others, he created STK Community to make 
                    the process easier for fellow Moroccan students.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/" className="text-primary hover:underline">Home Page</Link>
                    </li>
                    <li>
                      <Link to="/informationen" className="text-primary hover:underline">Blog & Information</Link>
                    </li>
                    <li>
                      <Link to="/unterlagen" className="text-primary hover:underline">Document Requirements</Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                  <p className="mb-4">
                    Have questions or suggestions? We're always looking to improve and help more students.
                  </p>
                  <Button className="stk-btn-primary w-full">
                    Send a Message
                  </Button>
                </CardContent>
              </Card>
            </div>
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

export default UberUns;
