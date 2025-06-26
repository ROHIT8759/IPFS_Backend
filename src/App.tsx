"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Search, ExternalLink, Wallet, Sun, Moon, FileText, Calendar, Hash } from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Badge } from "./components/ui/badge"
import { Separator } from "./components/ui/separator"
import { ThemeProvider } from "./components/theme-provider"
import "./App.css"

interface FileRecord {
  id: string
  name: string
  cid: string
  uploadDate: string
  size: string
}

function IPFSVaultDashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [uploadStatus, setUploadStatus] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dragActive, setDragActive] = useState(false)

  // Mock file data
  const [files] = useState<FileRecord[]>([
    {
      id: "1",
      name: "document.pdf",
      cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "image.jpg",
      cid: "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "presentation.pptx",
      cid: "QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4",
      uploadDate: "2024-01-13",
      size: "5.2 MB",
    },
  ])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const connectWallet = async () => {
    setUploadStatus("Connecting to MetaMask...")
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true)
      setWalletAddress("0x742d35Cc6634C0532925a3b8D4C9db96590b5b8C")
      setUploadStatus("Wallet connected successfully!")
      setTimeout(() => setUploadStatus(""), 3000)
    }, 1500)
  }

  const handleFileUpload = () => {
    if (!isConnected) {
      setUploadStatus("Please connect your wallet first")
      return
    }

    setUploadStatus("Uploading to IPFS...")
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus("File uploaded successfully!")
      setTimeout(() => setUploadStatus(""), 3000)
    }, 2000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file drop logic here
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.cid.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Navigation Header */}
      <header
        className={`border-b transition-colors duration-300 ${theme === "dark" ? "bg-gray-900/50 border-gray-800" : "bg-white/50 border-gray-200"} backdrop-blur`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                IPFS Vault
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="transition-all duration-200 hover:scale-105"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                onClick={connectWallet}
                disabled={isConnected}
                className="transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnected ? "Connected" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Decentralized File Storage</h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Upload and manage your files on IPFS with blockchain integration
            </p>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className={`grid w-full grid-cols-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <TabsTrigger
                value="upload"
                className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                My Files
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card
                className={`transition-all duration-200 hover:shadow-lg ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              >
                <CardHeader>
                  <CardTitle>Upload to IPFS</CardTitle>
                  <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    Drag and drop your files or click to browse
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                        : theme === "dark"
                          ? "border-gray-600 hover:border-gray-500"
                          : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload
                      className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <p className="text-lg font-medium mb-2">Drop files here</p>
                    <p className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>or</p>
                    <Button variant="outline" className="transition-all duration-200 hover:scale-105">
                      Browse Files
                    </Button>
                  </div>

                  {/* Wallet Address Display */}
                  <div className="space-y-2">
                    <Label htmlFor="wallet-address">Connected Wallet</Label>
                    <Input
                      id="wallet-address"
                      value={isConnected ? walletAddress : "Not connected"}
                      readOnly
                      className={`font-mono text-sm ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}
                    />
                  </div>

                  {/* Upload Button */}
                  <Button
                    onClick={handleFileUpload}
                    disabled={!isConnected}
                    className="w-full transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    size="lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload to IPFS
                  </Button>

                  {/* Status Message */}
                  {uploadStatus && (
                    <div
                      className={`p-4 rounded-lg border-l-4 border-blue-500 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
                    >
                      <p className="text-sm font-medium">{uploadStatus}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Files Tab */}
            <TabsContent value="files" className="space-y-6">
              <Card
                className={`transition-all duration-200 hover:shadow-lg ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
              >
                <CardHeader>
                  <CardTitle>My Files</CardTitle>
                  <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                    Browse and manage your uploaded files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <Input
                      placeholder="Search files by name or CID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Files List */}
                  <div className="space-y-4">
                    {filteredFiles.length === 0 ? (
                      <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No files found</p>
                      </div>
                    ) : (
                      filteredFiles.map((file) => (
                        <Card
                          key={file.id}
                          className={`transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                  <h3 className="font-medium truncate">{file.name}</h3>
                                  <Badge variant="secondary" className="text-xs">
                                    {file.size}
                                  </Badge>
                                </div>

                                <div
                                  className={`flex items-center space-x-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                                >
                                  <div className="flex items-center space-x-1">
                                    <Hash className="w-3 h-3" />
                                    <span className="font-mono truncate max-w-[200px]">{file.cid}</span>
                                  </div>
                                  <Separator orientation="vertical" className="h-4" />
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{file.uploadDate}</span>
                                  </div>
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-4 transition-all duration-200 hover:scale-105"
                                onClick={() => window.open(`https://ipfs.io/ipfs/${file.cid}`, "_blank")}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <IPFSVaultDashboard />
    </ThemeProvider>
  )
}

export default App
