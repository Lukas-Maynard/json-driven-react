"use client";
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MediaItem {
  title: string;
  author: string;
  publicationYear: number;
  type: string;
  length: string;
}

const Page = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Load data from data.json in the public folder: https://marrnuel.hashnode.dev/simplify-your-data-handling-learn-to-load-json-files-into-react-with-useeffect-usestate-and-fetch-api
  useEffect(() => {
    const fetchMediaData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      setMediaList(data.mediaList);
    };
    fetchMediaData();
  }, []);

  const handleClick = (index: number) => {
    setSelectedMedia(mediaList[index]);
  };

  return (
    // BOOTSTRAP BUTTONS: https://react-bootstrap.netlify.app/docs/components/buttons/ 
    <div className="container mt-5">
      <h1 className="text-center mb-4">Maynards Media Mayhem</h1>
      <div className="d-flex flex-column">
        {mediaList.map((item, index) => (
          <Button
            key={index}
            variant="outline-primary"
            className="mb-2"
            onClick={() => handleClick(index)}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {selectedMedia && (
        <div className="mt-4 p-3 border bg-light">
          <h2>{selectedMedia.title}</h2>
          <p><strong>Author:</strong> {selectedMedia.author}</p>
          <p><strong>Publication Year:</strong> {selectedMedia.publicationYear}</p>
          <p><strong>Type:</strong> {selectedMedia.type}</p>
          <p><strong>Length:</strong> {selectedMedia.length}</p>
        </div>
      )}
    </div>
  );
};

export default Page;