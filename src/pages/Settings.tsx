import { User, Bell, Shield, Moon, Globe, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/auth.store.ts";

export function Settings() {
  const { user } = useAuth();
  const initials = user.full_name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block col-span-1">
          <nav className="flex flex-col space-y-1 sticky top-24">
            <a
              href="#profile"
              className="px-3 py-2 text-sm font-medium rounded-lg bg-primary-50 text-primary-700"
            >
              Profile
            </a>
            <a
              href="#notifications"
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              Notifications
            </a>
            <a
              href="#security"
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              Security
            </a>
            <a
              href="#preferences"
              className="px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              Preferences
            </a>
          </nav>
        </div>

        <div className="col-span-1 md:col-span-3 space-y-8">
          <Card id="profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-400" /> Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 text-2xl">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Full Name
                  </label>
                  <Input defaultValue={user.full_name} />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Email Address
                  </label>
                  <Input type="email" defaultValue={user.email} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card id="notifications">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-400" /> Notification
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    Push Notifications
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive check-in requests on your device.
                  </p>
                </div>
                <Switch checked={true} />
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive daily summaries and account alerts.
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">SMS Fallback</p>
                  <p className="text-sm text-slate-500">
                    Send an SMS if push notifications fail.
                  </p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>

          <Card id="preferences">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-slate-400" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-slate-400" />
                    <p className="font-medium text-slate-900">Dark Mode</p>
                  </div>
                  <p className="text-sm text-slate-500">
                    Switch to a darker theme for night use.
                  </p>
                </div>
                <Switch checked={false} />
              </div>
              <div className="w-full h-px bg-slate-100"></div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Language
                </label>
                <select className="flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card id="security" className="border-danger-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-danger-600">
                <Shield className="h-5 w-5" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start text-slate-600"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Log out of all devices
                </Button>
              </Link>
              <Button className="w-full bg-danger-600 justify-start bg-danger-50 text-danger-600 hover:bg-danger-100 border-0 shadow-none">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
