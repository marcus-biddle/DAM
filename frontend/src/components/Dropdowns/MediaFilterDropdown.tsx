import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter, Image, Video, Music, FileText, File, HardDrive, Calendar, FileType, X, type LucideIcon } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  [key: string]: FilterOption[];
}

interface SelectedFiltersProp {
  [key: string]: FilterOption | null;
}

const MEDIA_FILTERS: FilterGroup[] = [
  {
    "asset type": [
      { label: "Image", value: "image" },
      { label: "Video", value: "video" },
      { label: "Audio", value: "audio" },
      { label: "Document", value: "document" },
      { label: "Other", value: "other" }
    ]
  },
  {
    "file size": [
      { label: "Small (< 1MB)", value: "small" },
      { label: "Medium (1MB - 10MB)", value: "medium" },
      { label: "Large (> 10MB)", value: "large" }
    ]
  },
  {
    "date uploaded": [
      { label: "Today", value: "today" },
      { label: "This Week", value: "this_week" },
      { label: "This Month", value: "this_month" }
    ]
  },
  {
    "file type": [
      { label: ".jpg", value: "jpg" },
      { label: ".png", value: "png" },
      { label: ".mp4", value: "mp4" },
      { label: ".mp3", value: "mp3" },
      { label: ".pdf", value: "pdf" }
    ]
  }
];

interface SingleDropdownProps {
  filterKey: string;
  filterOptions: FilterOption[];
  selectedValue: FilterOption | null;
  onSelect: (filterKey: string, option: FilterOption | null) => void;
  index: number;
}

const SingleDropdown: React.FC<SingleDropdownProps> = ({ 
  filterKey, 
  filterOptions, 
  selectedValue, 
  onSelect, 
  index 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getFilterIcon = (filterKey: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      'asset type': Image,
      'file size': HardDrive,
      'date uploaded': Calendar,
      'file type': FileType
    };
    return iconMap[filterKey] || Filter;
  };

  const getItemIcon = (filterKey: string, value: string): LucideIcon | null => {
    if (filterKey === 'asset type') {
      const iconMap: Record<string, LucideIcon> = {
        image: Image,
        video: Video,
        audio: Music,
        document: FileText,
        other: File
      };
      return iconMap[value] || File;
    }
    return null;
  };

  const handleSelect = (option: FilterOption): void => {
    onSelect(filterKey, option);
    setIsOpen(false);
  };

  const clearSelection = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onSelect(filterKey, null);
  };

  const FilterIcon = getFilterIcon(filterKey);

  const dropdownVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.1
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.15
      }
    })
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-4 py-3 bg-gray-900 rounded-full shadow-md border transition-all duration-200 hover:shadow-lg min-w-48 w-full ${
          selectedValue 
            ? 'border-emerald-800 bg-emerald-800' 
            : 'border-gray-800 hover:border-gray-800'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          selectedValue 
            ? 'bg-blue-100' 
            : 'bg-slate-100'
        }`}>
          <FilterIcon className={`w-4 h-4 ${
            selectedValue ? 'text-blue-600' : 'text-slate-600'
          }`} />
        </div>
        
        <div className="flex-1 text-left">
          <div className="text-xs text-slate-500 capitalize font-medium">
            {filterKey}
          </div>
          <div className={`text-sm font-medium ${
            selectedValue ? 'text-blue-700' : 'text-slate-400'
          }`}>
            {selectedValue ? selectedValue.label : 'Select...'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedValue && (
            <motion.button
              onClick={clearSelection}
              className="w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3 text-slate-600" />
            </motion.button>
          )}
          <motion.div
            variants={chevronVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10"
            />
            
            {/* Dropdown */}
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-20"
              style={{ transformOrigin: 'top left' }}
            >
              <div className="p-2 max-h-64 overflow-y-auto">
                {filterOptions.map((option: FilterOption, optionIndex: number) => {
                  const ItemIcon = getItemIcon(filterKey, option.value);
                  const isSelected = selectedValue?.value === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={optionIndex}
                      onClick={() => handleSelect(option)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {ItemIcon && (
                        <div className={`p-1.5 rounded-lg ${
                          isSelected 
                            ? 'bg-blue-100' 
                            : 'bg-slate-100 group-hover:bg-slate-200'
                        }`}>
                          <ItemIcon className={`w-4 h-4 ${
                            isSelected ? 'text-blue-600' : 'text-slate-600'
                          }`} />
                        </div>
                      )}
                      
                      <span className="flex-1 text-left font-medium">
                        {option.label}
                      </span>

                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MediaFilterDropdowns: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersProp>({});

  const handleFilterSelect = (filterKey: string, option: FilterOption | null): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: option
    }));
  };

  const clearAllFilters = (): void => {
    setSelectedFilters({});
  };

  const getSelectedCount = (): number => {
    return Object.values(selectedFilters).filter(Boolean).length;
  };

  return (
    <div className="">
      <div className="max-w-full mx-auto">
        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {MEDIA_FILTERS.map((filterGroup: FilterGroup, index: number) => {
            const filterKey = Object.keys(filterGroup)[0];
            const filterOptions = filterGroup[filterKey];
            
            return (
              <SingleDropdown
                key={filterKey}
                filterKey={filterKey}
                filterOptions={filterOptions}
                selectedValue={selectedFilters[filterKey] || null}
                onSelect={handleFilterSelect}
                index={index}
              />
            );
          })}
        </div>

        {/* Summary & Clear Button */}
        <AnimatePresence>
          {getSelectedCount() > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {/* <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-blue-600" />
                  </div> */}
                  <div>
                    {/* <h3 className="font-semibold text-slate-800">
                      {getSelectedCount()} filter{getSelectedCount() > 1 ? 's' : ''} active
                    </h3> */}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {Object.entries(selectedFilters).map(([key, value]: [string, FilterOption | null]) => 
                        value && (
                          <span 
                            key={key} 
                            className="px-2 py-1 bg-black text-white text-xs font-medium rounded-full border border-white"
                          >
                            {key}: {value.label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                
                <motion.button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};