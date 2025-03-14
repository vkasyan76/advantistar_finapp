"use client";

import { useState } from "react";
import { SelectCategorySheet } from "../categories/select-category-sheet";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

type Props = {
  transactionId: Id<"transactions">; // Transaction ID to update
  category: string | null; // Current category name (or null)
  categoryId?: Id<"categories">; // Optional current category ID
};

export const CategoryColumn = ({
  transactionId,
  category,
  categoryId: initialCategoryId,
}: Props) => {
  const [currentCategoryId, setCurrentCategoryId] = useState<
    Id<"categories"> | undefined
  >(initialCategoryId);
  const [currentCategoryName, setCurrentCategoryName] = useState<string | null>(
    category
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Use the dedicated mutation for updating just the category.
  const updateTransactionCategory = useMutation(
    api.transactions.updateTransactionCategory
  );

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  // When a new category is selected from the sheet, call the mutation.
  const handleSelectCategory = async (
    newCategoryId: string,
    newCategoryName: string
  ) => {
    try {
      await updateTransactionCategory({
        id: transactionId,
        categoryId: newCategoryId as unknown as Id<"categories">,
      });
      toast.success("Transaction category updated successfully!");
      setCurrentCategoryId(newCategoryId as unknown as Id<"categories">);
      setCurrentCategoryName(newCategoryName);
    } catch (error) {
      console.error("Error updating transaction category:", error);
      toast.error("Failed to update transaction category.");
    } finally {
      setIsSheetOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={handleOpenSheet}
        className={cn("flex items-center cursor-pointer hover:underline", {
          "text-rose-500": !currentCategoryId,
        })}
      >
        {!currentCategoryId && <TriangleAlert className="mr-2 h-4 w-4" />}
        <span>{currentCategoryName || "Uncategorized"}</span>
      </div>
      <SelectCategorySheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSelectCategory={handleSelectCategory}
      />
    </>
  );
};
