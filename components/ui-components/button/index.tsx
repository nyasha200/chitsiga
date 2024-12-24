import React from "react";

type ButtonProps<C extends React.ElementType = "button"> = {
    children: React.ReactNode;
    as?: C;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'black' | 'link' | 'selected';
    icon?: React.ElementType;
    fontSize?: [Sizes, Sizes] | [Sizes] | Sizes;
    size?: 'regular' | 'small';
    version?: 'brown' | 'orange' | 'red';
    additional?: string;
    rounded?: boolean;
} & React.ComponentPropsWithoutRef<C>;

export type Sizes =
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';

const Button = <C extends React.ElementType = "button">({
    children,
    as,
    variant = "primary",
    version = "brown",
    additional,
    icon: Icon,
    size = "regular",
    rounded = false,
    fontSize = ["xl", "xl"],
    ...restProps
}: ButtonProps<C>) => {
    const Component = as || "button";

    let backgroundColor = "bg-brown-1";
    let color = "text-gray-3";
    let hoverBackgroundColor = "hover:bg-brown-2";
    let hoverTextColor = "hover:text-gray-3";
    let height = "min-h-26";
    let borderColor = "border-transparent";
    let textTransform = "uppercase";
    let fontWeight = "font-bold";
    let padding = "px-12";
    let shadow = "shadow-sm";

    switch (variant) {
        case "secondary":
            backgroundColor = "bg-transparent";
            color = "text-brown-1";
            borderColor = "border-brown-1";
            textTransform = "";
            fontWeight = "";
            break;
        case "tertiary":
            backgroundColor = "";
            break;
        case "black":
            backgroundColor = "bg-black";
            color = "text-gray-3";
            break;
        case "link":
            backgroundColor = "bg-transparent";
            hoverBackgroundColor = "hover:transparent";
            hoverTextColor = "hover:text-black";
            padding = "";
            shadow = "";
            height = "h-auto";
            break;
        case "selected":
            backgroundColor = "bg-gray-1";
            textTransform = "";
            fontWeight = "";
            break;
    }

    switch (size) {
        case "small":
            fontSize = ["md", "md"];
            height = "h-20";
            break;
    }

    const textSize =
        typeof fontSize === "string"
            ? `text-${fontSize}`
            : `text-${fontSize[0]} ${fontSize.length > 1 ? `md:text-${fontSize[1]}` : ""}`;

    const bgColor =
        variant === "primary"
            ? version === "brown"
                ? `bg-brown-1 text-gray-3 hover:bg-brown-2 disabled:opacity-50 focus:outline focus:outline-2 focus:outline-brown-1`
                : version === "orange"
                    ? `bg-orange text-gray-3 hover:bg-red-1 disabled:opacity-50 focus:outline focus:outline-2 focus:outline-orange`
                    : `bg-red-1 text-gray-3 hover:bg-red-2 disabled:opacity-50 focus:outline focus:outline-2 focus:outline-red-1`
            : `text-md bg-transparent uppercase shadow-none border-b-[3px] border-transparent bg-shadow-none hover:border-b-brown-1 disabled:opacity-50 px-4 py-4 focus:outline-2 focus:outline-brown-1 focus:border-[2px] focus:border-gray-3`;

    return (
        <Component
            {...restProps}
            className={`${bgColor} ${additional ? additional : ""
                } ${textTransform} ${fontWeight} flex duration-300 items-center
      ${rounded && "rounded-md"} border ${borderColor} ${padding} ${height} ${textSize} font-bold ${shadow}
      justify-center items-center cursor-pointer focus-within:ring-transparent disabled:pointer-events-none h-[54px]`}
        >
            {children}
            {Icon && <Icon className="ml-4 h-16 w-16" />}
        </Component>
    );
};

export default Button;
