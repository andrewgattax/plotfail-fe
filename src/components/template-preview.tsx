import React from 'react';

interface TemplateProps {
  template: string
}

function TemplatePreview({template}: TemplateProps) {

  const stripText = (limit: number, text: string) => {
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }
    return words.slice(0, limit).join(' ') + '...';
  }

  const parseTemplateWithPlaceholders = (text: string) => {
    const parts = text.split(/(\{[^}]+\})/);
    return parts.map((part, index) => {
      if (part.match(/^\{[^}]+\}$/)) {
        return (
          <span 
            key={index}
            className="inline-flex items-center bg-primary/30 border border-primary/30 px-2 text-center rounded p-0.5"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }

  return (
    <div className={"text-foreground/90"}>
      {parseTemplateWithPlaceholders(stripText(15, template))}
    </div>
  );
}

export default TemplatePreview;