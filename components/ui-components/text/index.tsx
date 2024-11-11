import React from 'react';

type TextProps<C extends React.ElementType = 'p'> = {
    children: React.ReactNode;
    as?: C;
    color?: 'gray' | 'brown' | 'green' | 'black';
    weight?: 'normal' | 'bold';
    size?: 'sm' | 'md' | 'lg';
    additional?: string;
    variant?:
    'title1' | 'title2' | 'title3' | 'title4' | 'title4-lg' | 'title5' |
    'body1' | 'body2' | 'label1' | 'link';
} & React.ComponentPropsWithoutRef<C>;

const Text = <C extends React.ElementType = 'p'>({
    children,
    as,
    color = 'black',
    weight = 'normal',
    size = 'md',
    additional,
    variant = 'body1',
    ...restProps
}: TextProps<C>) => {

    const Component = as || 'p';

    const textSize = `text-${size}`;
    const textWeight = `font-${weight}`;

    const textColor = {
        'gray': 'text-[#333333]',
        'brown': 'text-[#934f10]',
        'green': 'text-[#399256]',
        'black': 'text-[#313131]',
    }[color] || 'text-[#313131]';

    let classes;
    switch (variant) {
        case 'title1':
            classes = 'text-3xl sm:text-xl md:text-5xl font-bold';
            break;
        case 'title2':
            classes = 'text-3xl md:text-6xl font-bold';
            break;
        case 'title3':
            classes = 'text-2xl md:text-5xl font-bold';
            break;
        case 'title4':
            classes = 'text-lg md:text-4xl font-bold';
            break;
        case 'title4-lg':
            classes = 'text-lg md:text-[4.5rem] font-bold';
            break;
        case 'title5':
            classes = 'text-lg md:text-2xl font-bold';
            break;
        case 'body1':
            classes = `text-lg md:text-xl ${textWeight}`;
            break;
        case 'body2':
            classes = `text-sm md:text-lg ${textWeight}`;
            break;
        case 'label1':
            classes = `text-md md:text-xl ${textWeight}`;
            break;
        case 'link':
            classes = `text-xs md:text-md ${textWeight}`;
            break;
        default:
            classes = `${textSize} ${textWeight}`;
            break;
    }

    return (
        <Component
            {...restProps}
            className={`${classes} ${textColor} ${additional || ''}`}
        >
            {children}
        </Component>
    );
};

export default Text;