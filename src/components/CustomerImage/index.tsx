const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#ccc" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#bbb" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  </svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

// const StaticImage = ({ url }) => {
//   const [rotate, setRotate] = useState(0);
//   return (
//     <div className="relative">
//       <div style={{ rotate: `${rotate}deg` }}>
//         <Image width={700} height={700} src={`data:image/jpeg; base64, ${url}`} alt="" />
//       </div>
//       <div className="absolute top-0">
//         <Button
//           type="link"
//           className="opacity-1/2"
//           icon={<RotateLeftOutlined />}
//           onClick={() => setRotate(rotate === 0 ? 270 : rotate - 90)}
//         ></Button>
//         <Button
//           type="link"
//           className="opacity-1/2"
//           icon={<RotateRightOutlined />}
//           onClick={() => setRotate(rotate === 270 ? 0 : rotate + 90)}
//         ></Button>
//       </div>
//     </div>
//   );
// };

// const UrlImage = ({ url, errorCallback }) => {
//   const [rotate, setRotate] = useState(0);
//   return (
//     <div className="relative">
//       <div style={{ rotate: `${rotate}deg` }}>
//         <Image
//           width={700}
//           height={700}
//           loader={() => url}
//           src={`example.jpg`}
//           placeholder="blur"
//           blurDataURL={`data:image/svg+xml;base64,${toBase64(convertImage(700, 475))}`}
//           alt=""
//           onError={() => {
//             errorCallback('加载失败');
//           }}
//         />
//       </div>
//       <div className="absolute top-0">
//         <Button
//           type="link"
//           className="opacity-1/2"
//           icon={<RotateLeftOutlined />}
//           onClick={() => setRotate(rotate === 0 ? 270 : rotate - 90)}
//         ></Button>
//         <Button
//           type="link"
//           className="opacity-1/2"
//           icon={<RotateRightOutlined />}
//           onClick={() => setRotate(rotate === 270 ? 0 : rotate + 90)}
//         ></Button>
//       </div>
//     </div>
//   );
// };

// export default function ImagesViewer({ initKey = '', images, imgGet = null, origin = null }) {
//   const [activeKey, setActiveKey] = useState(initKey);

//   const [imageUrl, setImageUrl] = useState<any>();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [errors, setErrors] = useState({});
//   const [imageVals, setImageVals] = useState<any>({});

//   const fetchImage = async (key) => {
//     const path = images.find((i) => i.key === key)?.value;
//     setLoading(true);
//     try {
//       const imgData = !imgGet ? await GoogleWmsPreviewer({ path }) : await imgGet(path);
//       setImageUrl(imgData?.data);
//       setImageVals({ ...imageVals, [key]: imgData?.data });
//     } catch (error: any) {
//       setError(error?.response?.data?.msg);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (origin) {
//       const imageUrl = images.find((item) => item.key === activeKey)?.value;
//       setImageUrl(
//         isArray(imageUrl) ? imageUrl.map((url) => `${origin}${url}`) : `${origin}${imageUrl}`,
//       );
//       return;
//     }
//     if (!activeKey) return;
//     if (imageVals[activeKey]) {
//       setImageUrl(imageVals[activeKey]);
//       return;
//     }
//     fetchImage(activeKey);
//   }, [origin, images, activeKey]);

//   return (
//     <>
//       <div className="preview-content">
//         <Radio.Group
//           value={activeKey}
//           onChange={({ target }) => {
//             setError(null);
//             setImageUrl(null);
//             setActiveKey(target.value);
//           }}
//           buttonStyle="solid"
//         >
//           {images
//             .filter((i) => i.value)
//             .map((img) => (
//               <Radio.Button className="mt-2" value={img.key} key={img.key} disabled={loading}>
//                 {img.title}
//               </Radio.Button>
//             ))}
//         </Radio.Group>
//         <Divider />
//         <div className="w-full">
//           {loading && <Skeleton active />}
//           {error && (
//             <Alert
//               className="mb-2"
//               type="error"
//               message="图片资源获取失败"
//               description={error}
//             ></Alert>
//           )}
//           <div className="d-flex j-center">
//             {!origin && imageUrl && <StaticImage url={imageUrl} />}
//             {origin && imageUrl && (
//               <>
//                 {isArray(imageUrl) && (
//                   <div className="d-flex flex-col">
//                     {!!imageUrl?.length &&
//                       imageUrl?.map((url, index) =>
//                         errors[url] ? (
//                           <>
//                             {index > 0 && <Divider />}
//                             <Alert
//                               type="error"
//                               message="图片资源获取失败"
//                               description={errors[url]}
//                             ></Alert>
//                           </>
//                         ) : (
//                           <>
//                             {index > 0 && <Divider />}
//                             <UrlImage
//                               url={url}
//                               errorCallback={(msg) => setErrors({ ...errors, [url]: msg })}
//                             />
//                           </>
//                         ),
//                       )}
//                     {!imageUrl?.length && <Empty />}
//                   </div>
//                 )}
//                 {!isArray(imageUrl) && (
//                   <UrlImage url={imageUrl} errorCallback={(msg) => setError(msg)} />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function ImagesViewer({ initKey = '', images, imgGet = null, origin = null }) {
  return <div>产看图片新组件</div>;
}
