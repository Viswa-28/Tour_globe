TOURGLOBE — CULTURAL TOURISM IMAGES
===================================

9 destinations, 3 formats each. 1024 x 683 (3:2).

USE
  AVIF  primary        ~40-65 KB
  WebP  fallback       ~60-95 KB
  JPG   last resort   ~118-157 KB

next/image serves AVIF then WebP automatically - just reference the .jpg
or point at the AVIF directly.

  <Image src="/destinations/colosseum-rome-italy.jpg"
         width={1024} height={683}
         alt="The Colosseum in Rome at sunrise" />

SUITABLE FOR
  Destination cards up to ~512px wide on retina.

NOT SUITABLE FOR
  Full-bleed hero or banner use. Source tiles were ~500px and have been
  upscaled 2x; they will look soft above ~600px display width.

NOTE
  These are AI-generated. Treat place names as approximate - the Varanasi
  and Marrakech frames are impressions, not documentary photographs.
  Replace with licensed or client-owned photography before launch.
