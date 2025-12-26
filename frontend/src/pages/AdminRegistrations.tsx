import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Download } from "lucide-react";

const AdminRegistrations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.getRegistrations();
        if (response.success) {
          setRegistrations(response.data.map((r: any) => ({
            id: r.id,
            name: r.name,
            email: r.email,
            phone: r.phone,
            address: r.address,
            paymentStatus: r.paymentStatus === 'success' ? 'Paid' : 'Pending',
            amount: r.amount,
            date: new Date(r.createdAtISO).toLocaleDateString(),
          })));
        }
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(reg =>
    reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-secondary/20">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">All Registrations</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">{reg.name}</TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{reg.address}</TableCell>
                    <TableCell>
                      <Badge
                        variant={reg.paymentStatus === "Paid" ? "default" : "secondary"}
                        className={reg.paymentStatus === "Paid" ? "bg-primary" : ""}
                      >
                        {reg.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{reg.amount}</TableCell>
                    <TableCell>{reg.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No registrations found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminRegistrations;
