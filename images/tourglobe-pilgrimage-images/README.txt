TOURGLOBE — PILGRIMAGE TOURISM IMAGES
===================================

9 destinations, 3 formats each. 1024 x 683 (3:2).

USE
  AVIF  primary        ~40-65 KB
  WebP  fallback       ~60-95 KB
  JPG   last resort   ~118-157 KB

next/image serves AVIF then WebP automatically - just reference the .jpg
or point at the AVIF directly.

  <Image src="/destinations/angkor-wat-siem-reap-cambodia.jpg"
         width={1024} height={683}
         alt="Angkor Wat reflected in its moat at sunrise" />

SUITABLE FOR
  Destination cards up to ~512px wide on retina.

NOT SUITABLE FOR
  Full-bleed hero or banner use. Source tiles were ~500px and have been
  upscaled 2x; they will look soft above ~600px display width.

NOTE
  These are AI-generated. Names describe what each frame resembles, not a
  verified location. "dravidian-temple-tank-tamil-nadu" is deliberately
  generic - it resembles a Tamil temple with a tank but matches no single
  identifiable one.

  SENSITIVITY - these are active places of worship, not scenery. An
  inaccurate or synthetic image of a sacred site reads worse than an
  inaccurate landscape. Replace the Bodh Gaya, Puri, Lhasa and Assisi
  frames with licensed photography before launch, and have the client
  confirm each one depicts what it claims.
