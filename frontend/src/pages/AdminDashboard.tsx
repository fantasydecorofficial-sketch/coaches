


import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import {
  Users,
  MousePointerClick,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  LogOut,
  Link as LinkIcon
} from "lucide-react";
import AdminRegistrations from "./AdminRegistrations";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [meetUrl, setMeetUrl] = useState("");
  const [updatingUrl, setUpdatingUrl] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.getDashboardStats();
        if (response.success) {
          // Transform backend data to match UI expected format
          const d = response.dashboard;
          setStats({
            totalVisits: d.analytics.pageVisits,
            totalRegistrations: d.registrations.total,
            buttonClicks: d.analytics.buttonClicks,
            paymentSuccess: d.registrations.successful,
            paymentFailures: d.registrations.failed,
            conversionRate: d.analytics.pageVisits > 0
              ? ((d.registrations.total / d.analytics.pageVisits) * 100).toFixed(2)
              : 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMeetUrl = async () => {
      try {
        const response = await api.getMeetUrl();
        if (response.success && response.url) {
          setMeetUrl(response.url);
        }
      } catch (error) {
        console.error("Failed to fetch meet url:", error);
      }
    };

    fetchStats();
    fetchMeetUrl();
  }, []);

  const handleUpdateUrl = async () => {
    if (!meetUrl) return;

    setUpdatingUrl(true);
    try {
      const response = await api.updateMeetUrl(meetUrl);
      if (response.success) {
        toast({
          title: "Success",
          description: "Meeting URL updated successfully",
        });
      } else {
        throw new Error(response.error || "Failed to update");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update meeting URL",
        variant: "destructive",
      });
    } finally {
      setUpdatingUrl(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.adminLogout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!stats) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load data</div>;
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Meet URL Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Meeting Link Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end max-w-xl">
              <div className="flex-1 space-y-2">
                <Label htmlFor="meetUrl">Google Meet / Zoom URL</Label>
                <Input
                  id="meetUrl"
                  placeholder="https://meet.google.com/..."
                  value={meetUrl}
                  onChange={(e) => setMeetUrl(e.target.value)}
                />
              </div>
              <Button onClick={handleUpdateUrl} disabled={updatingUrl}>
                {updatingUrl ? "Updating..." : "Update Link"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This link will be sent to users in their confirmation email and WhatsApp message.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Visits</p>
                <p className="text-3xl font-bold">{stats.totalVisits}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Registrations</p>
                <p className="text-3xl font-bold">{stats.totalRegistrations}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Button Clicks</p>
                <p className="text-3xl font-bold">{stats.buttonClicks}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Success</p>
                <p className="text-3xl font-bold text-primary">{stats.paymentSuccess}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Failures</p>
                <p className="text-3xl font-bold text-destructive">{stats.paymentFailures}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold text-accent">{stats.conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <AdminRegistrations />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
