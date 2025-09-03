# 📧 Advanced Email Send App with Template Builder  

This project was built solo as part of my **upskilling journey**, where I challenged myself to **design, code, containerize, and automate deployment pipelines** – making it feel close to an **enterprise-level production system**.  

---

## 🚀 Features  

🔹 **Drag & Drop Email Editor** – Create templates visually with reusable blocks  
🔹 **Code Editor (HTML/CSS)** – For developers who prefer fine-grained control  
🔹 **Dynamic Placeholders (`{{name}}`)** – Personalize campaigns in one click  
🔹 **Template Management** – Save, clone, customize, and even request to share publicly  
🔹 **Free Templates** – Kickstart with ready-made designs  
🔹 **Automated Emails** – Schedule messages with cron jobs  
🔹 **Bulk & Campaign Emails** – Send to multiple recipients seamlessly  
🔹 **RabbitMQ Integration** – Queue management for handling large-scale email campaigns  
🔹 **API Toolkit + Swagger Docs** – So developers can integrate email sending into any app  

---

## ⚡ DevOps – Enterprise-Ready Setup (Docker + CI/CD + RabbitMQ)  

To push myself beyond just coding, I focused on designing a **scalable, fault-tolerant infrastructure**:  

- 🐳 **Dockerized** the entire app (Frontend, Backend, Database, RabbitMQ) with **Docker Compose**  
- 🔄 Built a **GitHub Actions CI/CD pipeline** that:  
  - Runs linting & tests on every push  
  - Builds & pushes Docker images  
  - Deploys automatically to a production-like environment  
- 📬 Used **RabbitMQ** for distributed message handling → ready for enterprise-scale workloads  
- ✅ Ensures every change is tested, packaged, and deployable with zero manual effort  

---

## 🛠️ Tech Stack  

- **Frontend:** React, GrapeJS, HTML, CSS  
- **Backend:** Node.js, Express.js, REST API  
- **Database:** MySQL  
- **Queue:** RabbitMQ  
- **DevOps:** Docker, Docker Compose, GitHub Actions CI/CD  

---

## 💡 Key Learnings  

This isn’t just an app – it’s a **mini-enterprise system**.  
By taking this from **idea → code → containerization → automated deployment → message queue integration**, I gained hands-on experience in:  

✅ Full-stack development (React + Node.js + MySQL)  
✅ Authentication & secure API design  
✅ Containerization & scaling with Docker + RabbitMQ  
✅ CI/CD automation with GitHub Actions  
✅ Designing for enterprise-level reliability  

---

## 📌 Getting Started  

1. Clone the repository  
   ```bash
   git clone https://github.com/ShahidKollam/Email-Client.git

