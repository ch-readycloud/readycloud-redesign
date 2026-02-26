import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Pencil } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-12">
          <h1 className="mb-4">Landing Page Wireframe</h1>
          <p className="text-gray-600">
            Low-fidelity mockup for your CRM landing page
          </p>
        </div>

        <Link to="/low-fidelity" className="block">
          <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                <Pencil className="w-8 h-8 text-gray-700 group-hover:text-blue-600" />
              </div>
            </div>
            <h2 className="text-center mb-2">View Wireframe</h2>
            <p className="text-center text-gray-600 text-sm">
              Low-fidelity prototype with placeholder content and layout structure
            </p>
          </div>
        </Link>

        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <h3 className="mb-3">About This Mockup</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Clean hero section inspired by Shipbob and Rippling</li>
            <li>• Scrolling logo bar (Deel-style) showing trusted companies</li>
            <li>• Value proposition cards highlighting core benefits</li>
            <li>• Large product blocks showcasing ReadyShipper, ReadyReturns, and Action Alerts</li>
            <li>• Combined stats and integrations section at the bottom</li>
          </ul>
        </div>
      </div>
    </div>
  );
}