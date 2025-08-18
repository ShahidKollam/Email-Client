import ReactDOMServer from "react-dom/server"
import { BiText, BiHeading } from "react-icons/bi"
import { FaBox, FaGripLines, FaTable } from "react-icons/fa"
import { IoImageOutline } from "react-icons/io5"
import { RxDividerHorizontal } from "react-icons/rx"
import { TbHandClick, TbImageInPicture } from "react-icons/tb"

// Store the icon rendering in variables
const textIconHTML = ReactDOMServer.renderToString(<BiText size="30px" color="currentColor" />)
const headerIconHTML = ReactDOMServer.renderToString(<BiHeading size="30px" color="currentColor" />)
const dividerIcon = ReactDOMServer.renderToString(<RxDividerHorizontal size="100px" color="currentColor" />)
const spaceIcon = ReactDOMServer.renderToString(<FaGripLines size="30px" color="currentColor" />)
const logoIconHTML = ReactDOMServer.renderToString(<TbImageInPicture size="30px" color="currentColor" />)
const imageIconHTML = ReactDOMServer.renderToString(<IoImageOutline size="30px" color="currentColor" />)
const buttonIconHTML = ReactDOMServer.renderToString(<TbHandClick size="30px" color="currentColor" />)
const containerIconHTML = ReactDOMServer.renderToString(<FaBox size="30px" color="currentColor" />)
const tableIconHTML = ReactDOMServer.renderToString(<FaTable size="30px" color="currentColor" />)

export const TextBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Text</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${textIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "text",
    content: `
      <p style="font-size: 20px; color: #333333; line-height: 1.5; padding-left: 3px; margin: 0;">
        Enter your paragraph or text content here...
      </p>
    `,
  },
  category: "Components",
}

// HeaderBlock Email Component
export const HeaderBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Header</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${headerIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "text",
    content: `
      <h1 style="
        padding: 12px 0px 16px;
        font-size: 32px;
        color: #333333;
        line-height: 1.5;
        margin: 0;
      ">Header Title</h1>
    `,
  },
  category: "Components",
}

// LogoBlock Email Component
export const LogoBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Logo</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${logoIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "logo",
    content: `
      <div style="text-align: center; padding: 16px;">
        <img src="https://devpm.mycarepedia.com/images/logo.png" alt="Logo" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
      </div>
    `,
  },
  category: "Components",
}

// ImageBlock Email Component
export const ImageBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Image</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${imageIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "image",
    content: `
    <div style="text-align: center; padding: 16px; display: block; margin: 0 auto;;">
      <img src="https://example.com/default-image.png" alt="" style="max-width: 100%; height: auto; display: block; margin: 0 auto;" />
    </div>
    `,
  },
  category: "Components",
}

// SpaceBlock Email Component
export const SpaceBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Space</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${spaceIcon}
      </div>
    </div>
  `,
  content: {
    type: "div",
    content: '<div style="height: 50px; line-height: 16px;"> &nbsp;</div>', // Adding a div for space
  },
  category: "Components",
}

// DividerBlock Email Component
export const DividerBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Divider</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${dividerIcon}
      </div>
    </div>
  `,
  content: {
    type: "hr",
    content:
      '<hr style="border-top: 1px solid #333333; width: 100%; margin: 0; padding-top: 16px; padding-bottom: 16px;">', // Horizontal line with padding for spacing
  },
  category: "Components",
}

export const ContainerBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Body</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${containerIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "div",
    content: `
    <div style="min-height: 100vh; height: auto; ">
      &nbsp;
    </div>
  `,
  },
  category: "Components",
}

// Define a custom button block with dynamic content
export const ButtonBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Button</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${buttonIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "button",
    tagName: "a",
    attributes: { href: "#" }, // default href
    content: "Click Here", // default button text
    style: {
      display: "inline-block",
      padding: "12px 24px",
      "background-color": "#007bff",
      color: "#ffffff",
      "text-decoration": "none",
      "border-radius": "5px",
      "font-size": "16px",
      "font-weight": "bold",
      "text-align": "center",
    },
    traits: [
      {
        type: "text",
        label: "Button Text",
        name: "content",
        changeProp: true,
      },
      {
        type: "text",
        label: "URL",
        name: "href",
        changeProp: true,
      },
    ],
  },
  category: "Components",
}

// export const TableHeaderBlock = {
//   label: `
//     <div class="flex flex-col items-center text-center">
//       <span class="text-gray-400 font-semibold text-sm mb-2">Table Header</span>
//       <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
//         ${tableIconHTML}
//       </div>
//     </div>
//   `,
//   content: {
//     type: "text",
//     content: `
//       <table style="width: 100%; border-collapse: collapse;">
//         <thead>
//           <tr style=" text-align: left;">
//             <th style="padding: 12px; ">Header 1</th>
//             <th style="padding: 12px; ">Header 2</th>
//           </tr>
//         </thead>
//       </table>
//     `,
//   },
//   category: "Table",
// };

// export const TableRowColumnBlock = {
//   label: `
//     <div class="flex flex-col items-center text-center">
//       <span class="text-gray-400 font-semibold text-sm mb-2">Table Row/Column</span>
//       <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
//         ${tableIconHTML}
//       </div>
//     </div>
//   `,
//   content: {
//     type: "text",
//     content: `
//       <table style="width: 100%; border-collapse: collapse;">
//         <tbody>
//           <tr style="">
//             <td style="padding: 12px; ">Row 1</td>
//             <td style="padding: 12px; ">Row 1</td>
//           </tr>

//         </tbody>
//       </table>
//     `,
//   },
//   category: "Table",
// };

export const TableHeaderBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Table Header</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${tableIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "text",
    content: `
      <div style="display: flex; width: 100%; border-bottom: 1px solid #ccc; font-weight: bold;">
        <div style="flex: 1; padding: 12px; text-align: left;">Header 1</div>
        <div style="flex: 1; padding: 12px; text-align: left;">Header 2</div>
      </div>
    `,
  },
  category: "Text Columns",
}

export const TableColBlock = {
  label: `
    <div class="flex flex-col items-center text-center">
      <span class="text-gray-400 font-semibold text-sm mb-2">Table Column</span>
      <div class="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-lg">
        ${tableIconHTML}
      </div>
    </div>
  `,
  content: {
    type: "text",
    content: `
      <div style="display: flex; width: 100%;">
        <div style="flex: 1; padding: 12px; text-align: left;">Row 1</div>
        <div style="flex: 1; padding: 12px; text-align: left;">Row 1</div>
      </div>
    `,
  },
  category: "Text Columns",
}
