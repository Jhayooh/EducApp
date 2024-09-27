/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteVideo, getVideos } from "@/actions/video";
import { Card } from "@/components/ui/card";
import { getYouTubeVideoId, truncateString } from "@/lib/utils";
import { Loader2, Edit, EllipsisVertical, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import parse from "html-react-parser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/components/ui/modal";
import CreateVideo from "@/components/forms/add-video";
import AlertModal from "@/components/ui/alert-modal";

const VideoList = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { status, videos, message } = await getVideos();
      if (status === 200) {
        if (videos) {
          setVideos(videos);
        }
      } else {
        toast.error(message || "Failed to load videos.");
      }
      setLoading(false);
    };

    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="flex items-center m-auto mt-20">
        <Loader2 size={50} className="animate-spin" />
      </div>
    );

  if (editModal) {
    return (
      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title="Update Video Lectures"
        description="Update your course for your community"
      >
        <CreateVideo initialData={selectedVideo} />
      </Modal>
    );
  }

  const onDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteVideo(selectedVideo.id);
      if (response.status === 200) {
        setDeleteModal(false);
        toast.success("Video lecture deleted successfully");
        window.location.reload();
      } else {
        toast.error(response.message || "Failed to delete video lecture");
      }
    } catch (error) {
      console.error("Error deleting video lecture:", error);
      toast.error("Failed to delete video lecture");
    } finally {
      setLoading(false);
    }
  };

  return videos.map((video) => (
    <>
      <AlertModal
        isOpen={deleteModal}
        loading={loading}
        onClose={() => setDeleteModal(false)}
        onConfirm={onDelete}
      />
      <div key={video.id}>
        <Card className="bg-transparent border-themeGray h-full rounded-xl overflow-hidden">
          {/* Video Player */}
          <div className="h-4/6">
            {video.method === "local" ? (
              <video controls className="w-full h-full" src={video.videoUrl} />
            ) : (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  video.videoUrl
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div className="h-2/6 flex flex-col justify-center px-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-white font-semibold">{video.name}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedVideo(video); // Set the selected video data
                      setEditModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedVideo(video); // Set the selected video data
                      setDeleteModal(true);
                    }}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-themeTextGray">
              {parse(truncateString(video.description))}
            </p>
          </div>
        </Card>
      </div>
    </>
  ));
};

export default VideoList;
