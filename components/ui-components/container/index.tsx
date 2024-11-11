import React, { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', onClick }) => {
    return (
        <div className={`p-4 md:p-8 ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Container;