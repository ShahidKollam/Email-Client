import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"
import UserModel from "./userModel.js"

const EmailTemplate = sequelize.define("EmailTemplate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  template_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  template_description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  html_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  css_content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  api_url: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
    allowNull: false,
  },
  template_id: {
    type: DataTypes.STRING(20), // Length restricted to 10 characters
    allowNull: false,
    unique: true, // Ensure no duplicates
  },
  category: {
    type: DataTypes.ENUM("dynamic_content", "marketing_campaign", "static_content", "general"),
    allowNull: true,
    defaultValue: "dynamic_content",
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
})

// Relationships
UserModel.hasMany(EmailTemplate, { foreignKey: "userId", onDelete: "CASCADE" })
EmailTemplate.belongsTo(UserModel, { foreignKey: "userId" })

// // Add beforeCreate Hook to Generate `template_id`
// EmailTemplate.beforeCreate(async (template) => {
//   // Fetch the highest existing template_id
//   const lastTemplate = await EmailTemplate.findOne({
//     order: [['id', 'DESC']],
//     attributes: ['id', 'template_id'],
//   });

//   let nextId = 1; // Default if no existing templates
//   if (lastTemplate && lastTemplate.template_id) {
//     const match = lastTemplate.template_id.match(/\d+$/); // Extract numeric part
//     if (match) {
//       nextId = parseInt(match[0]) + 1;
//     }
//   }

//   // Generate `template_id` with length restricted to 10 (TEMP-0001)
//   template.template_id = `TEMP-${nextId.toString().padStart(4, '0')}`; // 4 digits max
// });

export default EmailTemplate

// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';
// import UserModel from './userModel.js';

// const EmailTemplate = sequelize.define('EmailTemplate', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   template_name: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   template_description: {
//     type: DataTypes.STRING(255),
//     allowNull: true,
//   },
//   subject: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   html_content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   css_content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   api_url: {
//     type: DataTypes.STRING(200),
//     allowNull: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: UserModel,
//       key: 'id',
//     },
//     allowNull: false,
//   },
//   category: {
//     type: DataTypes.ENUM('dynamic_content', 'marketing_campaign', 'static_content', 'general'),
//     allowNull: true,
//     defaultValue: 'dynamic_content',
//   },
//   isDefault: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   isApproved: {
//     type: DataTypes.BOOLEAN,
//     allowNull: true,
//     defaultValue: null,
//   }
// });

// // Relationships
// UserModel.hasMany(EmailTemplate, { foreignKey: 'userId', onDelete: 'CASCADE' });
// EmailTemplate.belongsTo(UserModel, { foreignKey: 'userId' });

// export default EmailTemplate;
