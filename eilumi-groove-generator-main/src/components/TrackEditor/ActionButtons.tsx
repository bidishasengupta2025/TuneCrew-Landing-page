
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface ActionButtonsProps {
  isLoading: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isLoading, 
  onCancel, 
  onSave 
}) => {
  return (
    <div className="mt-8 flex gap-4 justify-end">
      <Button 
        variant="outline" 
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button 
        onClick={onSave}
        disabled={isLoading}
      >
        <Save className="h-4 w-4 mr-2" />
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default ActionButtons;
