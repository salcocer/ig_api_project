export function Video({ src }: { src: string }) {
    return (
        <video width="320" height="475" controls preload="none">
            <source src={src} type="video/mp4" />
            {/* <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" /> */}
            Your browser does not support the video tag.
        </video>
    );
}
