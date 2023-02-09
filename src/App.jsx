import React, { useState ,useEffect} from "react";
import { storage } from "./firebase.js";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import axios from 'axios'
const App = () => {
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const [doc, setDoc] = useState(0);
  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadtask = uploadBytesResumable(storageRef, file);
    uploadtask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },(err)=>console.log(err),()=>{
      getDownloadURL(uploadtask.snapshot.ref).then(url=>setDoc(url))
    });
  };
  const formHandler = (e) => {
    e.preventDefault()
    const file = e.target[0].files[0]
    uploadFile(file)
  };
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://firebasestorage.googleapis.com/v0/b/yfxacademy-3bb7d.appspot.com/o/good%20will.mp4?alt=media&token=0d9d2d0c-d527-4f9e-a3d3-576a85d83f06", {
        responseType: 'arraybuffer',
      });
      setVideoData(new Uint8Array(response.data));
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 h-full w-full p-20">
      <form onSubmit={formHandler} className="m-auto w-2/4">
        <input type="file" />
        <button type="submit">Envoyer</button>
      </form>
      <hr />
      <h3>Uploading{progress}%</h3>
      <div className="w-2/4 h-48 bg-white">
        <img src={doc} alt="" /></div> 
        <video controls>
      <source
        src="https://firebasestorage.googleapis.com/v0/b/yfxacademy-3bb7d.appspot.com/o/good%20will.mp4?alt=media&token=0d9d2d0c-d527-4f9e-a3d3-576a85d83f06"
        type="video/mp4"
      />
      Your browser does not support HTML5 video.
    </video>
    </div>
  );
};
export default App;
