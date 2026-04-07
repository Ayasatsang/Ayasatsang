import { cn } from "@/lib/utils";
import { EditableText } from "@/editor";
import { Link } from "react-router-dom";

interface TestimonialsSectionProps {
  className?: string;
}

const testimonials = [
  {
    image: '/images/img/Rectangle.png',
    size: '220rem',
    maxWidth: '350rem',
    fontSize: '16rem',
    contentKey: 'index.reviews.testimonial1',
    defaultText: '«Після першої зустрічі всередині стало тихо, ніби хтось прибрав внутрішній шум. Не було складних термінів чи правил — тільки присутність, дбайливість і чисте Світло.»',
    animationClass: 'scroll-animate-left',
    delay: '',
  },
  {
    image: '/images/img/Rectangle-1.png',
    size: '280rem',
    maxWidth: '400rem',
    fontSize: '18rem',
    contentKey: 'index.reviews.testimonial2',
    defaultText: '«Після першої зустрічі всередині стало тихо, ніби хтось прибрав внутрішній шум. Не було складних термінів чи правил — тільки присутність, дбайливість і чисте Світло.»',
    animationClass: 'scroll-animate-scale',
    delay: 'delay-2',
  },
  {
    image: '/images/img/Rectangle-2.png',
    size: '220rem',
    maxWidth: '350rem',
    fontSize: '16rem',
    contentKey: 'index.reviews.testimonial3',
    defaultText: '«Після першої зустрічі всередині стало тихо, ніби хтось прибрав внутрішній шум. Не було складних термінів чи правил — тільки присутність, дбайливість і чисте Світло.»',
    animationClass: 'scroll-animate-right',
    delay: 'delay-4',
  },
];

const TestimonialsSection = ({ className }: TestimonialsSectionProps) => {
  return (
    <div id="reviews" className={cn("relative z-30", className)} style={{ paddingBottom: '120rem', overflow: 'visible' }}>
      {/* Section title */}
      <EditableText
        contentKey="index.reviews.title"
        defaultValue="Відгуки моїх Сонечок"
        as="h2"
        className="section-title text-center font-display italic scroll-animate"
        style={{
          paddingTop: '80rem',
          paddingBottom: '80rem',
          letterSpacing: '-2rem',
          color: '#fff',
          textShadow: '0 2rem 20rem rgba(106, 180, 255, 0.5)',
        }}
      />

      {/* Testimonials grid - 3 suns */}
      <div
        className="grid-testimonials mx-auto items-start scroll-animate"
        style={{ maxWidth: '1300rem', padding: '0 60rem' }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn("flex flex-col items-center", testimonial.animationClass, testimonial.delay)}
            style={{ flex: 1, maxWidth: testimonial.maxWidth }}
          >
            <img
              src={testimonial.image}
              alt="Сонечко"
              className="sun-rotate"
              style={{ width: testimonial.size, height: testimonial.size, objectFit: 'contain' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/FFD700/FFA500?text=☀️';
              }}
            />
            <EditableText
              contentKey={testimonial.contentKey}
              defaultValue={testimonial.defaultText}
              as="p"
              multiline
              className="text-center font-serif italic"
              style={{
                marginTop: '24rem',
                fontSize: testimonial.fontSize,
                lineHeight: '1.5',
                color: index === 1 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center" style={{ marginTop: '60rem' }}>
        <Link
          to="/reviews"
          className="btn-gold inline-flex items-center justify-center scroll-animate"
          style={{
            padding: '16rem 48rem',
            fontSize: '18rem',
            fontWeight: '500',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Переглянути всі відгуки
        </Link>
      </div>
    </div>
  );
};

export default TestimonialsSection;
