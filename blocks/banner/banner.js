export default function decorate(block) {
      
    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
       // const pic = col.querySelector('picture');
       const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('banner-img-col');
        }
      }
       
      });
    });
  }