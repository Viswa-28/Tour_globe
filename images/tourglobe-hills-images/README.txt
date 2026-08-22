TOURGLOBE — HILL STATIONS IMAGES
===================================

9 destinations, 3 formats each. 1024 x 683 (3:2).

USE
  AVIF  primary        ~40-65 KB
  WebP  fallback       ~60-95 KB
  JPG   last resort   ~118-157 KB

next/image serves AVIF then WebP automatically - just reference the .jpg
or point at the AVIF directly.

  <Image src="/destinations/phewa-lake-pokhara-nepal.jpg"
         width={1024} height={683}
         alt="Wooden boats on Phewa Lake below the Annapurna range" />

SUITABLE FOR
  Destination cards up to ~512px wide on retina.

NOT SUITABLE FOR
  Full-bleed hero or banner use. Source tiles were ~500px and have been
  upscaled 2x; they will look soft above ~600px display width.

NOTE
  These are AI-generated. Place names describe what each frame resembles,
  not a verified location. Two frames are deliberately unnamed because
  they match no specific place: "snowbound-alpine-village" and
  "autumn-teahouse-japan" (generic, not a real named teahouse).
  Replace with licensed or client-owned photography before launch.
