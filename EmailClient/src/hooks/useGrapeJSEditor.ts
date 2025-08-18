"use client"

import { useEffect, useRef, useState } from "react"
import grapesjs, { type Editor } from "grapesjs"
import "grapesjs/dist/css/grapes.min.css"
import "../components/emailEditor/grapes.css"

import {
  TextBlock,
  HeaderBlock,
  SpaceBlock,
  DividerBlock,
  ImageBlock,
  LogoBlock,
  ContainerBlock,
  ButtonBlock,
  TableHeaderBlock,
  TableColBlock,
} from "../components/emailEditor/HTMLTags"
import { styleSectors } from "../components/emailEditor/styleSectors"

export const useGrapeJSEditor = () => {
  const editorRef = useRef<Editor | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      const panelDevices = document.querySelector(".panel__devices")
      if (panelDevices) panelDevices.innerHTML = ""

      const editorInstance = grapesjs.init({
        container: "#gjs",
        fromElement: false,
        height: "100%",
        width: "auto",
        storageManager: false,
        panels: {
          defaults: [
            {
              id: "devices",
              el: ".panel__devices",
              buttons: [
                {
                  id: "device-desktop",
                  label: "Desktop",
                  command: () => editorInstance.setDevice("Desktop"),
                  togglable: false,
                },
                {
                  id: "device-tablet",
                  label: "Tablet",
                  command: () => editorInstance.setDevice("Tablet"),
                  togglable: false,
                },
                {
                  id: "device-mobile",
                  label: "Mobile",
                  command: () => editorInstance.setDevice("Mobile"),
                  togglable: false,
                },
                {
                  id: "device-a4",
                  label: "A4",
                  command: () => editorInstance.setDevice("A4"),
                  togglable: false,
                },
              ],
            },
          ],
        },
        blockManager: {
          appendTo: "#blocks",
        },
        styleManager: {
          appendTo: ".panel__style",
          sectors: styleSectors,
        },
        traitManager: {
          appendTo: ".panel__traits",
        },
        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet", width: "768px" },
            { name: "Mobile", width: "425px" },
            { name: "A4", width: "793px", height: "1122px" },
          ],
        },
      })

      // Add custom blocks
      editorInstance.BlockManager.add("box-block", ContainerBlock)
      editorInstance.BlockManager.add("text-block", TextBlock)
      editorInstance.BlockManager.add("header-block", HeaderBlock)
      editorInstance.BlockManager.add("space-block", SpaceBlock)
      editorInstance.BlockManager.add("divider-block", DividerBlock)
      editorInstance.BlockManager.add("image-block", ImageBlock)
      editorInstance.BlockManager.add("logo-block", LogoBlock)
      editorInstance.BlockManager.add("button-block", ButtonBlock)
      editorInstance.BlockManager.add("tableHead-block", TableHeaderBlock)
      editorInstance.BlockManager.add("table-block", TableColBlock)

      // Handle component selection event
      editorInstance.on("component:selected", (component) => {
        const traits = component.get("traits")
        traits.remove("id")
        traits.remove("title")
      })

      editorRef.current = editorInstance
      setEditor(editorInstance)
    }

    return () => {
      editorRef.current?.destroy()
      editorRef.current = null
    }
  }, [])

  console.log(editor)

  return { editor, editorRef }
}
