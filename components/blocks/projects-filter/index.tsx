import React from 'react';

interface ProjectsFilterProps {
    selectedStage: string;
    onFilterChange: (stage: string) => void;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
    selectedStage,
    onFilterChange,
}) => {
    const filters = ['ALL', 'residential', 'public', 'industrial'];

    return (
        <div className="flex gap-4 md:gap-12 my-4 justify-start">
            {filters.map((filter) => (
                <div
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`cursor-pointer block py-2 pr-4 md:mr-12 pl-3 font-bold mt-4 md:mt-0 text-[14px] md:text-[18px] whitespace-nowrap
                        ${selectedStage === filter
                            ? 'text-red-1 border-b-4 border-red-1'
                            : 'text-brown-2'
                        } transition-all duration-300 ease-in-out`}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </div>
            ))}
        </div>
    );
};

export default ProjectsFilter;