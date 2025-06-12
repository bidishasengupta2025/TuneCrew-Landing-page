
import { Twitter, Instagram, Youtube, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialShareButtonsProps {
  trackId: string;
  className?: string;
  compact?: boolean;
}

const SocialShareButtons = ({ trackId, className = "", compact = false }: SocialShareButtonsProps) => {
  const handleShare = (platform: string) => {
    console.log(`Sharing track ${trackId} on ${platform}`);
    // This would be replaced with actual sharing functionality
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <TooltipProvider>
        {compact ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleShare("general")}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare("tiktok")}
                >
                  <span className="text-xs font-bold">TT</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>TikTok</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare("instagram")}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Instagram</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare("youtube")}
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>YouTube Shorts</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Twitter</TooltipContent>
            </Tooltip>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
};

export default SocialShareButtons;
