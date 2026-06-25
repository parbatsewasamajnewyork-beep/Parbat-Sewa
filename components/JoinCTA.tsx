import CTABand from './CTABand';

export default function JoinCTA() {
  return (
    <div id="join">
      <CTABand
        kicker="Ready to make a difference?"
        text="Join our growing network of Parbat professionals and community members in New York. Let's build a stronger future together."
        primaryLabel="JOIN TODAY"
        primaryHref="/contact"
        secondaryLabel="EXPLORE EVENTS"
        secondaryHref="/events"
      />
    </div>
  );
}
