import { AfterViewInit, Component } from '@angular/core';
import p5 from 'p5';

declare var tikz: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  canvas: any;
  sw = 2;
  c: any = [];
  strokeColor = 0;
  //
  content = {
    latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$',
  };
  content1234 = {
    latex: `hello`
  }
  content2 = {
    mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mover>
      <munder>
        <mo>∫</mo>
        <mn>0</mn>
      </munder>
      <mi>∞</mi>
    </mover>
    <mtext> versus </mtext>
    <munderover>
      <mo>∫</mo>
      <mn>0</mn>
      <mi>∞</mi>
    </munderover>
  </mrow>
</math>`,
  };
  content3 = `$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$`;
  content4 = `$\\begin{align}
  \\dot{x} & = \\sigma(y-x) \\\\
  \\dot{y} & = \\rho x - y - xz \\\\
  \\dot{z} & = -\\beta z + xy
  \\end{align}$`;
  content5 = `$\\left( \\sum_{k=1}^n a_k b_k \\right)^{\\!\\!2} \\leq
  \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)$`;
  //
  content6 = `$\\mathbf{V}_1 \\times \\mathbf{V}_2 =
  \\begin{vmatrix}
   \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\
   \\frac{\\partial X}{\\partial u} & \\frac{\\partial Y}{\\partial u} & 0 \\\\
   \\frac{\\partial X}{\\partial v} & \\frac{\\partial Y}{\\partial v} & 0 \\\\
  \\end{vmatrix}$`;
  //
  content7 = { mathml: `$P(E) = {n \\choose k} p^k (1-p)^{ n-k}$` };
  //
  content8 = `$\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =
  1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}
   {1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }$`;
  //
  content9 = `$1 +  \\frac{q^2}{(1-q)}+\\frac{q^6}{(1-q)(1-q^2)}+\\cdots =
  \\prod_{j=0}^{\\infty}\\frac{1}{(1-q^{5j+2})(1-q^{5j+3})},
   \\quad\\quad \\text{for $|q|<1$}.$`;
  //

  drawings: any = {};
  // figures: any = [];
  figures: any = [
    `
    \\begin{tikzpicture}
    \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
    \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
    \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
    \\draw (-0.1,2.3)node[right]{$35^o$};
    \\end{tikzpicture}
    `,
    `
    \\begin{tikzpicture}[scale=0.7]
    \\draw[color=gray!50,step=1cm] (-0.3,-0.3) grid (10.8,8.8);
    \\draw (0,-0.3)node[below]{0};
    \\draw (2,-0.3)node[below]{2};
    \\draw (4,-0.3)node[below]{4};
    \\draw (6,-0.3)node[below]{6};
    \\draw (8,-0.3)node[below]{8};
    \\draw (10,-0.3)node[below]{10};
    
    \\draw (-0.3,0)node[left]{0};
    \\draw (-0.3,1)node[left]{2};
    \\draw (-0.3,2)node[left]{4};
    \\draw (-0.3,3)node[left]{6};
    \\draw (-0.3,4)node[left]{8};
    \\draw (-0.3,5)node[left]{10};
    \\draw (-0.3,6)node[left]{12};
    \\draw (-0.3,7)node[left]{14};
    \\draw (-0.3,8)node[left]{16};
    
    
    \\draw[line width=0.3mm] (0,2.9) --(9,8.6);
    
    
    \\draw[fill=black] (0,3.1)circle(2.5pt);
    \\draw[fill=black] (1,3)circle(2.5pt);
    \\draw[fill=black] (1,3.55)circle(2.5pt);
    \\draw[fill=black] (2,4.5)circle(2.5pt);
    
    \\draw[fill=black] (3,5.3)circle(2.5pt);
    
    \\draw[fill=black] (4,5)circle(2.5pt);
    
    \\draw[fill=black] (6,7)circle(2.5pt);
    \\draw[fill=black] (8,8)circle(2.5pt);
    
    \\draw[fill=black] (8,7.5)circle(2.5pt);
    
        
    \\draw[->] (-0.3,0) -- (10.8,0)node[right]{$x$};
    
    \\draw[->] (0,-0.3) -- (0,8.8)node[above]{$y$};
    \\end{tikzpicture}
    `,
    // `
    // \\begin{tikzpicture}
    // \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
    // \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
    // \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
    // \\draw (-0.1,2.3)node[right]{$35^o$};
    // \\end{tikzpicture}
    // `,
  ];
  public loadScript(id: string, content: string) {
    console.log('Loadscript initiating ', id);
    if (!this.drawings[id]) {
      console.log('Loadscript printing ', id);
      // let body = <HTMLDivElement>document.body;
      let body = document.getElementById(id);
      let script = document.createElement('script');
      //   script.innerHTML = `
      // \\begin{tikzpicture}
      // \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
      // \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
      // \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
      // \\draw (-0.1,2.3)node[right]{$35^o$};
      // \\end{tikzpicture}
      // `;
      script.innerHTML = content;
      script.src = './assets/tikz/tikz.js';
      script.async = true;
      script.defer = true;
      script.type = 'text/tikz';
      body!.appendChild(script);
      this.drawings[id] = true;
    }
  }

  // content10 = `
  // <script type="text/tikz">
  //     \begin{tikzpicture}
  //       \draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
  //       \draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
  //       \draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
  //       \draw (-0.1,2.3)node[right]{$35^o$};
  //     \end{tikzpicture}
  //   </script>`;
  //
  content11 = '--------[ The End ]--------';
  //

  draw() {
    const sketch = (s: any) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas2.parent('sketch-holder');
        // document.getElementById('sketch-holder')!.innerHTML = 'Testing';
        s.background(255);
        s.strokeWeight(this.sw);
        this.c[0] = s.color(0, 0, 255);
        s.rect(0, 0, s.width, s.height);
        s.stroke(this.c[this.strokeColor]);
      };
      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          } else if (s.mouseButton === s.CENTER) {
            s.background(255);
          }
        }
      };
    };

    this.canvas = new p5(sketch);
  }
  ngAfterViewInit(): void {
    // for (let i = 0; i < this.figures.length; i++) {
    //   this.loadScript('loadScript' + i, this.figures[i]);
    // }
  }
  ngOnInit() {
    // this.loadScript();
    setTimeout(() => {
      this.loadScript(
        'latexTest',
        ` \\begin{tikzpicture}
      \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
      \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
      \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
      \\draw (-0.1,2.3)node[right]{$35^o$};
      \\end{tikzpicture}`
      );
    }, 5000);
    // this.drawItems();
    this.draw();
    setTimeout(() => {
      console.log('s');
      this.content = {
        latex:
          'After refresh : When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$',
      };
    }, 2000);
  }

  drawItems() {
    setTimeout(() => {
      this.figures = [
        `
        \\begin{tikzpicture}
        \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
        \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
        \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
        \\draw (-0.1,2.3)node[right]{$35^o$};
        \\end{tikzpicture}
        `,
        `
        \\begin{tikzpicture}
        \\draw (0,0)node[below]{$D$} -- (2.8,0)node[below]{$F$};
        \\draw (0,0) -- (0,3.2)node[left]{$E$} -- (2.8,0);
        \\draw (0,0.3) -- (0.3,0.3) -- (0.3,0);
        \\draw (-0.1,2.3)node[right]{$35^o$};
        \\end{tikzpicture}
        `,
      ];
      for (let i = 0; i < this.figures.length; i++) {
        this.loadScript('loadScript' + i, this.figures[i]);
      }
    }, 5000);
  }
}
