export const generalSector = {
  name: "General",
  open: false,
  properties: [
    {
      name: "Color",
      property: "color",
      type: "color",
    },
    {
      name: "Background Color",
      property: "background-color",
      type: "color",
    },
    {
      name: "Box Shadow",
      property: "box-shadow",
      type: "select",
      defaults: "none",
      options: [
        { value: "none", name: "None" },
        { value: "0px 4px 8px rgba(0, 0, 0, 0.2)", name: "Soft Shadow" },
        { value: "0px 8px 16px rgba(0, 0, 0, 0.3)", name: "Medium Shadow" },
        { value: "0px 12px 24px rgba(0, 0, 0, 0.4)", name: "Large Shadow" },
        { value: "0px 0px 5px rgba(0, 0, 0, 0.5)", name: "Inner Shadow" },
        { value: "2px 2px 5px rgba(0, 0, 0, 0.3)", name: "Offset Shadow" },
        { value: "0px 10px 20px rgba(0, 0, 0, 0.2), 0px 6px 6px rgba(0, 0, 0, 0.15)", name: "Double Shadow" },
        { value: "0px 4px 4px rgba(0, 0, 0, 0.3)", name: "Subtle Shadow" },
      ],
    },
  ],
}

export const borderSector = {
  name: "Border",
  open: false,
  properties: [
    {
      name: "Border",
      property: "border",
      type: "composite",
      properties: [
        {
          name: "Width",
          property: "border-width",
          type: "text",
          defaults: "1px",
        },
        {
          name: "Style",
          property: "border-style",
          type: "select",
          options: [
            { value: "solid", name: "Solid" },
            { value: "dashed", name: "Dashed" },
            { value: "dotted", name: "Dotted" },
            { value: "none", name: "None" },
          ],
          defaults: "solid",
        },
        {
          name: "Color",
          property: "border-color",
          type: "color",
          defaults: "#000000",
        },
      ],
    },
    {
      name: "Border Top",
      property: "border-top",
      type: "select",
      options: [
        { value: "solid", name: "Solid" },
        { value: "none", name: "None" },
      ],
      defaults: "solid",
    },
    {
      name: "Border Radius",
      property: "border-radius",
      type: "text",
      defaults: "5px",
    },
  ],
}

// Typography section with web-safe fonts for email compatibility
export const typographySector = {
  name: "Typography",
  open: false,
  properties: [
    {
      name: "Color",
      property: "color",
      type: "color",
    },
    {
      name: "Font Family",
      property: "font-family",
      type: "select",
      options: [
        { value: "Arial, sans-serif", name: "Arial" },
        { value: "Verdana, sans-serif", name: "Verdana" },
        { value: "Helvetica, sans-serif", name: "Helvetica" },
        { value: "Times New Roman, serif", name: "Times New Roman" },
        { value: "Georgia, serif", name: "Georgia" },
      ],
    },
    {
      name: "Font Size",
      property: "font-size",
      type: "text",
      default: "20px",
    },
    {
      name: "Font Weight",
      property: "font-weight",
      type: "select",
      options: [
        { value: "normal", name: "Normal" },
        { value: "bold", name: "Bold" },
        { value: "lighter", name: "Lighter" },
      ],
    },
    {
      name: "Line Height",
      property: "line-height",
      type: "text",
      default: "1.8px",
    },
  ],
}

// Spacing section with padding, margin, width, and height settings
export const spacingSector = {
  name: "Spacing",
  open: false,
  properties: [
    {
      name: "Padding Top",
      property: "padding-top",
      type: "text",
      defaults: "20px", // Customize padding-top
    },
    {
      name: "Padding Right",
      property: "padding-right",
      type: "text",
      defaults: "20px", // Customize padding-right
    },
    {
      name: "Padding Bottom",
      property: "padding-bottom",
      type: "text",
      defaults: "20px", // Customize padding-bottom
    },
    {
      name: "Padding Left",
      property: "padding-left",
      type: "text",
      defaults: "20px", // Customize padding-left
    },
    {
      name: "Margin",
      property: "margin",
      type: "text",
      defaults: "10px",
    },
    {
      name: "Padding",
      property: "padding",
      type: "text",
      defaults: "20px", // Customize padding-left
    },
    {
      name: "Width",
      property: "width",
      type: "text",
      defaults: "100%",
    },
    {
      name: "Height",
      property: "height",
      type: "text",
      defaults: "auto",
    },
  ],
}

// Layout section for controlling email container size and layout
export const layoutSector = {
  name: "Layout",
  open: false,
  properties: [
    {
      name: "Max Width",
      property: "max-width",
      type: "text",
      defaults: "600px",
    },
    {
      name: "Container Width",
      property: "width",
      type: "text",
      defaults: "100%",
    },
    {
      name: "Text Align",
      property: "text-align",
      type: "select",
      options: [
        { value: "left", name: "Left" },
        { value: "center", name: "Center" },
        { value: "right", name: "Right" },
      ],
    },
  ],
}

export const styleSectors = [generalSector, borderSector, typographySector, spacingSector, layoutSector]
