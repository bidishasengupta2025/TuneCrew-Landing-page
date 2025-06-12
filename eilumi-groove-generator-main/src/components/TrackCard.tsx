
import React from 'react';
import { Play, Edit, Download, Share2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ViralScoreDial from './ViralScoreDial';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

interface TrackCardProps {
  id: string;
  title: string;
  genre: string;
  mood: string;
  viralScore: number;
  thumbnail?: string;
  createdAt: string;
  view?: 'grid' | 'list';
  onPlay?: () => void;
  onDelete?: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  id,
  title,
  genre,
  mood,
  viralScore,
  thumbnail = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
  createdAt,
  view = 'grid',
  onPlay,
  onDelete
}) => {
  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 w-full p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div 
          className="w-12 h-12 bg-cover bg-center rounded-md flex-shrink-0" 
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 rounded-md flex items-center justify-center">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white/95"
              onClick={onPlay}
            >
              <Play className="h-4 w-4 text-eilumi-orange" />
            </Button>
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-md">{title}</h3>
          <div className="flex text-xs text-eilumi-dark-gray">
            <span>{genre}</span>
            <span className="mx-1">•</span>
            <span>{mood}</span>
          </div>
        </div>
        
        <div className="hidden md:block">
          <ViralScoreDial score={viralScore} size="sm" />
        </div>
        
        <div className="flex gap-2">
          <Link to={`/optimizer?track=${id}`}>
            <Button size="icon" variant="outline">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to={`/export?track=${id}`} className="flex w-full">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Export</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>TikTok</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Instagram</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="icon" variant="outline" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <div 
        className="w-full aspect-square bg-cover bg-center" 
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-14 w-14 rounded-full bg-white/80 hover:bg-white/95"
            onClick={onPlay}
          >
            <Play className="h-6 w-6 text-eilumi-orange" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-md mb-1">{title}</h3>
            <div className="flex text-xs text-eilumi-dark-gray">
              <span>{genre}</span>
              <span className="mx-1">•</span>
              <span>{mood}</span>
            </div>
          </div>
          <ViralScoreDial score={viralScore} size="sm" />
        </div>
      </div>
      
      <div className="p-4 pt-0 flex justify-between border-t border-gray-100 mt-auto">
        <Link to={`/optimizer?track=${id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            <Edit className="mr-2 h-4 w-4" /> Optimize
          </Button>
        </Link>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="ml-2">
              <Share2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={`/export?track=${id}`} className="flex w-full">
                <Download className="mr-2 h-4 w-4" />
                <span>Export</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              <span>TikTok</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TrackCard;
