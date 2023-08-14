import sanitizeHtml from 'sanitize-html';

export function sanitize(html: string){
    return sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedAttributes: {
          img: ['src', 'align']
        }
      })
    
}