import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import { useUrlState } from "@/context";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LinkIcon, LogOut, User, BarChart3, Settings } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUrlState();

  const handleLogout = () => {
    // Implement logout logic here
    navigate("/auth");
  };

  return (
    <nav className="py-6 flex justify-between items-center">
      <Link to="/" className="group">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <LinkIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            LinkShort
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Avatar className="w-10 h-10 border-2 border-gradient-to-r from-blue-500 to-purple-500">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium text-gray-800">
                    {user?.user_metadata?.full_name || "User"}
                  </div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <DropdownMenuLabel className="font-semibold text-gray-800">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
                <Link to="/dashboard" className="flex items-center w-full">
                  <BarChart3 className="mr-3 h-4 w-4 text-blue-600" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-purple-50">
                <User className="mr-3 h-4 w-4 text-purple-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Settings className="mr-3 h-4 w-4 text-gray-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;