import Eq from "../components/Eq";
import MathBlock from "../components/MathBlock";
import TheoremEnv from "../components/TheoremEnv";
import TheoremRef from "../components/TheoremRef";
import ClientTableOfContents from "../components/ClientTableOfContents";

export default function Page() {
  return (
    <>
      <ClientTableOfContents position="right" />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1>Global Regularity Program for Leray–Hopf Solutions in {"$\\mathbb{R}^3$"}</h1>

      <section className="mb-8">
        <h2 id="problem-statement">Problem Statement and Disclaimer</h2>
        <p>
          Consider the three-dimensional incompressible Navier–Stokes equations
        </p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\partial_t u + (u \\cdot \\nabla)u = -\\nabla p + \\nu \\Delta u, \\qquad \\nabla \\cdot u = 0 \\label{nse}"
            }
            display
          />
        </div>
        <p>
          on {"$\\mathbb{R}^3 \\times (0, T)$"} with initial data {"$u_0 \\in L^2(\\mathbb{R}^3)$"} divergence-free.
        </p>
        <p className="mt-4">
          The fundamental question posed by the Clay Millennium Prize is whether Leray–Hopf weak solutions
          remain smooth for all positive times, or whether finite-time blow-up can occur.
        </p>
        <p className="mt-4">
          <strong>We aim to prove <TheoremRef label="main" />:</strong> Every Leray–Hopf weak solution is smooth
          on {"$(0, T)$"}, establishing that finite-time blow-up is impossible. This program is evolving and has
          not been peer-reviewed. An ArXiv submission is currently pending. This is a high-level outline for which
          no correctness is asserted beyond the author's current understanding.
        </p>
      </section>

      <h2 id="definitions">Definitions</h2>

      <TheoremEnv type="definition" label="leray-hopf" title="Leray–Hopf Weak Solution">
        <p>
          A vector field {"$u: \\mathbb{R}^3 \\times (0, T) \\to \\mathbb{R}^3$"} is a
          <em> Leray–Hopf weak solution </em>
          of the incompressible Navier–Stokes equations if all of the following conditions hold.
        </p>

        <ol className="list-decimal list-inside my-4 space-y-4">

          <li>
            <strong>Energy–class regularity. </strong>
            {
              "$u \\in L^\\infty(0,T; L^2(\\mathbb{R}^3)) \\cap L^2(0,T; \\dot H^1(\\mathbb{R}^3))$"
            }{" "}
            and the time derivative satisfies the Lions–Magenes condition{" "}
            {
              "$\\partial_t u \\in L^{4/3}(0,T; \\dot H^{-1}(\\mathbb{R}^3))$"
            }{" "}
            in the distributional sense.
            <p className="mt-2">
              Equivalently:
            </p>
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>{"$t \\mapsto \\|u(t)\\|_{L^2}$"} is weakly-* measurable and uniformly bounded;</li>
              <li>{"$\\nabla u \\in L^2_{t,x}$"} with {"$\\displaystyle \\int_0^T \\|\\nabla u(t)\\|_{L^2}^2 dt < \\infty$"}.</li>
            </ul>
          </li>

          <li>
            <strong>Solenoidal constraint. </strong>
            {
              "$\\nabla \\cdot u = 0$"
            }{" "}
            in the sense of distributions: for every{" "}
            {
              "$\\phi \\in C_c^\\infty(\\mathbb{R}^3 \\times (0,T))$"
            },
            <br />

            <div className="my-4">
          <MathBlock
            tex={
              "\\displaystyle \\int_0^T \\! \\int_{\\mathbb{R}^3} u \\cdot \\nabla \\phi \\, dx \\, dt = 0. \\label{solenoidal-constraint}"
            }
            display
          />
        </div>
          </li>

          <li>
            <strong>Weak formulation. </strong>
            For all divergence-free test functions{" "}
            {
              "$\\varphi \\in C_c^\\infty(\\mathbb{R}^3 \\times (0,T); \\mathbb{R}^3)$"
            }{" "}
            with {"$\\nabla \\,\\cdot \\, \\varphi = 0$"}:
            <div className="my-4">
            <MathBlock
              tex={
                "\\int_0^T \\! \\int_{\\mathbb{R}^3} \\Big( -u \\cdot \\partial_t \\varphi - (u \\otimes u) : \\nabla \\varphi + 2\\nu \\, \\nabla u : \\nabla \\varphi \\Big) \\, dx \\, dt = \\int_{\\mathbb{R}^3} u_0(x) \\cdot \\varphi(x,0) \\, dx. \\label{weak-form}"
              }
              display
            /> </div>
            <p>
              The pressure {"$p$"} is recovered (up to time-dependent harmonic polynomials) through the Leray projector and satisfies
              {" "}{"$p \\in L^{3/2}_{\\mathrm{loc}}$"}.
            </p>
          </li>

          <li>
            <strong>Energy inequality. </strong>
            For almost every {"$t \\in (0,T)$"}:
            <div className="my-4">
            <MathBlock
              tex={
                "\\|u(t)\\|_{L^2}^2 + 2\\nu \\int_0^t \\|\\nabla u(s)\\|_{L^2}^2 \\, ds \\leq \\|u_0\\|_{L^2}^2."
              }
              display
            />
            </div>
          </li>
        </ol>
      </TheoremEnv>


      <TheoremEnv type="definition" label="scaled-fields" title="Scaled Fields">
        <p>
          For {"$\\lambda > 0$"}, define the
          <em> parabolic scaling </em>
          of velocity, vorticity, and dyadic curvature:
        </p>
        <div className="my-4">
        <MathBlock
          tex={
            "u^{(\\lambda)}(x,t) = \\lambda \\, u(\\lambda x, \\lambda^2 t), \\qquad \\omega^{(\\lambda)} = \\nabla \\times u^{(\\lambda)}, \\qquad \\Omega^{(\\lambda)} = \\omega^{(\\lambda)} \\otimes \\omega^{(\\lambda)}. \\label{scaled-fields}"
          }
          display
        /></div>

        <p className="my-4">
          This scaling preserves the form of the Navier–Stokes equations and the Leray–Hopf energy inequality.
        </p>

        <p className="my-4">
          At the level of function spaces:
        </p>

        <ul className="list-disc list-inside ml-6 space-y-2">
          <li>
            <strong>Energy invariance. </strong>
            {
              "$u \\in L^\\infty_t L^2_x$"
            }{" "}
            implies
            {" "}{
              "$u^{(\\lambda)} \\in L^\\infty_t L^2_x$"
            }{" "}
            with identical norms.
          </li>

          <li>
            <strong>Enstrophy invariance. </strong>
            {
              "$u \\in L^2_t \\dot H^1_x$"
            }{" "}
            implies {" "}
            {
              "$u^{(\\lambda)} \\in L^2_t \\dot H^1_x$"
            }{" "}
            with identical norms (criticality in 3D).
          </li>

          <li>
            <strong>Vorticity scaling. </strong>  
            {
              "$\\omega^{(\\lambda)}(x,t) = \\lambda^2 \\, \\omega(\\lambda x, \\lambda^2 t)$"
            }{" "}
            and thus

            <MathBlock
          tex={
            "\\Omega^{(\\lambda)} = \\lambda^4 (\\omega \\otimes \\omega)(\\lambda x, \\lambda^2 t)"
          }
          display
        />
            behaves as a curvature-type tensor field.
          </li>

          <li>
            <strong>Operator invariance. </strong>
            All Calderón–Zygmund operators, in particular the Biot–Savart kernel,
            commute compatibly with this scaling structure.
          </li>
        </ul>
      </TheoremEnv>


      <TheoremEnv type="definition" label="cz-op" title="Calderón–Zygmund Stretching Operator">
        <p>
          Let {"$T$"} be the Calderón–Zygmund singular integral operator associated with the Biot–Savart law.
          For a tensor field {"$F : \\mathbb{R}^3 \\to \\mathbb{R}^{3 \\times 3}$"} define:
        </p>

        <MathBlock
          tex={
            "T(F)(x) = \\mathrm{p.v.} \\int_{\\mathbb{R}^3} K(x-y) : F(y) \\, dy."
          }
          display
        />

        <p className="my-4">
          The kernel {"$K$"} satisfies the classical size and cancellation conditions:
        </p>

        <MathBlock
          tex={
            "|K(x)| \\lesssim |x|^{-3}, \\qquad \\int_{S^2} K(\\theta) \\, d\\theta = 0."
          }
          display
        />

        <ul className="list-disc list-inside ml-6 space-y-2">

          <li>
            <strong>Boundedness. </strong>
            For every {"$1 < p < \\infty$"},{" "}
            {
              "$T : L^p(\\mathbb{R}^3) \\to L^p(\\mathbb{R}^3)$"
            }{" "}
            is a bounded linear operator.
          </li>

          <li>
            <strong>Vortex stretching identity. </strong>  
            The nonlinear stretching term satisfies
            {" "}{
              "$(\\omega \\cdot \\nabla) u = T(\\omega \\otimes \\omega)$"
            }{" "}
            in distributions, and almost everywhere when {" "}
            {
              "$\\omega \\in L^2$"
            }.
            <br />
          </li>

          <li>
            <strong>Divergence compatibility. </strong>
            If {"$\\nabla \\cdot F = 0$"} row-wise then {" "}
            {
              "$\\nabla \\cdot T(F) = 0$"
            }.
            This ensures energy-consistent nonlocality.
          </li>

          <li>
            <strong>Scale invariance. </strong>
            Under parabolic scaling,
            {" "}{
              "$T(F^{(\\lambda)}) = \\lambda^3 \\, T(F)(\\lambda x)$"
            },{" "}
            which matches the criticality of vortex stretching in 3D.
             <br />
          </li>
        </ul>
      </TheoremEnv>

      <p>
        We proceed by contradiction. Assume blow-up occurs at some {"$(x_0, t_0)$"}. Without loss of generality, set{" "}
        {"$x_0 = 0$"} and {"$t_0 = 0$"}.
      </p>

      <h2 id="scaling-compactness">Scaling and Compactness</h2>

      <TheoremEnv type="lemma" label="scaling" title="Scaling Invariance and Local Compactness">
        <p>There exists {"$\\lambda_k \\to \\infty$"} such that</p>
        <div className="my-4">
          <MathBlock
            tex={
              "u^{(\\lambda_k)} \\rightharpoonup u^\\infty \\quad \\text{in } L^2_{\\mathrm{loc}}((-\\infty,0]; H^1_{\\mathrm{loc}}) \\label{u-conv}"
            }
            display
          />
        </div>
        <div className="my-4">
          <MathBlock
            tex={
              "\\omega^{(\\lambda_k)} \\rightharpoonup \\omega^\\infty \\quad \\text{in } L^2_{\\mathrm{loc}}((-\\infty,0]; L^2_{\\mathrm{loc}}) \\label{omega-conv}"
            }
            display
          />
        </div>
        <div className="my-4">
          <MathBlock
            tex={
              "\\Omega^{(\\lambda_k)} \\rightharpoonup \\Omega^\\infty + \\mathfrak{m} \\quad \\text{in } \\mathcal{M}_{\\mathrm{loc}}(\\mathbb{R}^3 \\times (-\\infty,0]) \\label{Omega-conv}"
            }
            display
          />
        </div>
        <p>where {"$\\mathfrak{m}$"} is a tensor-valued Radon measure (the <em>defect measure</em>).</p>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="scaling" /></h3>
      <ol className="list-decimal list-inside my-4 space-y-3">
        <li>
          <TheoremRef label="leray-hopf" /> gives
          <div className="my-4">
            <MathBlock
              tex={"u \\in L^\\infty(0,T; L^2), \\qquad \\nabla u \\in L^2(0,T; L^2) \\label{lh-bounds}"}
              display
            />
          </div>
          <p>Energy inequality is invariant under <TheoremRef label="scaled-fields" />.</p>
        </li>
        <li>
          For every compact {"$K \\subset \\mathbb{R}^3 \\times (-\\infty, 0)$"},
          <div className="my-4">
            <MathBlock
              tex={
                "\\int_K |\\nabla u^{(\\lambda)}|^2 \\, dx \\, dt = \\int_{\\lambda K} |\\nabla u|^2 \\, dx \\, dt \\leq C \\label{energy-compact}"
              }
              display
            />
          </div>
          <p>
            for all sufficiently large {"$\\lambda$"}, because {"$\\lambda K \\subset B_R \\times (-R^2, 0]$"} for some{" "}
            {"$R$"}.
          </p>
        </li>
        <li>By Banach–Alaoglu, {"$u^{(\\lambda_k)} \\rightharpoonup u^\\infty$"} in {"$L^2_{\\mathrm{loc}} H^1_{\\mathrm{loc}}$"}.</li>
        <li>
          Since {"$\\omega = \\nabla \\times u$"}, vorticity enjoys the same bounds: {"$\\omega^{(\\lambda)} \\in L^2_{\\mathrm{loc}}$"}.
          Thus {"$\\omega^{(\\lambda_k)} \\rightharpoonup \\omega^\\infty$"} in {"$L^2_{\\mathrm{loc}}$"}.
        </li>
        <li>
          Apply DiPerna–Majda measure compactness to {"$\\Omega^{(\\lambda_k)}$"} to obtain the defect {"$\\mathfrak{m}$"}. ∎
        </li>
      </ol>

      <TheoremEnv type="corollary" label="ancient-lh">
        <p>{"$u^\\infty$"} is an ancient Leray–Hopf solution on {"$(-\\infty, 0]$"}.</p>
      </TheoremEnv>

      <p>
        <em>Proof.</em> Weak limits preserve: divergence-free, local energy inequality (via lower semicontinuity), and weak
        continuity in {"$L^2$"}. Thus {"$u^\\infty$"} satisfies all Leray–Hopf axioms backward in time. ∎
      </p>

      <h2 id="structure-defect">Structure of the Defect</h2>

      <TheoremEnv type="lemma" label="defect" title="Rank-1 Morrey-1 Structure of the Defect Measure">
        <p>The defect {"$\\mathfrak{m}$"} satisfies:</p>
        <ol className="list-decimal list-inside my-4 space-y-2">
          <li>Positivity: {"$\\mathfrak{m}(x,t)$"} is positive semidefinite.</li>
          <li>Rank-1 a.e., i.e., {"$\\mathfrak{m}(x,t) = \\theta(x,t) \\eta \\otimes \\eta$"}.</li>
          <li>Morrey-1 estimate: for all parabolic cylinders {"$Q_r$"},</li>
        </ol>
        <div className="my-4">
          <MathBlock tex={"\\mathfrak{m}(Q_r(x,t)) \\leq C r \\label{morrey}"} display />
        </div>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="defect" /></h3>
      <ol className="list-decimal list-inside my-4 space-y-3">
        <li>
          Since {"$\\Omega^{(\\lambda)} = \\omega^{(\\lambda)} \\otimes \\omega^{(\\lambda)}$"}, each {"$\\Omega^{(\\lambda)}$"} is
          positive semidefinite. Weak-* limits of positive semidefinite measures remain positive semidefinite.
        </li>
        <li>
          Rank-1 structure follows from the DiPerna–Majda decomposition for sequences of rank-1 tensors with
          {"$L^2$"}-bounded generating vectors.
        </li>
        <li>
          Morrey-1 comes from the local estimate
          <div className="my-4">
            <MathBlock tex={"\\int_{B_{\\lambda r}} |\\omega|^2 \\leq C \\lambda r \\label{morrey-local}"} display />
          </div>
          <p>
            when rescaled by {"$\\lambda$"}, giving {"$\\Omega^{(\\lambda)}(Q_r) \\leq Cr$"}. Passing to the limit yields the
            same upper bound for {"$\\mathfrak{m}$"}. ∎
          </p>
        </li>
      </ol>

      <TheoremEnv type="corollary" label="morrey-density">
        <p>{"$\\mathfrak{m}$"} has finite 1-dimensional parabolic density at every point.</p>
      </TheoremEnv>

      <h2 id="calderon-zygmund">Calderón–Zygmund Analysis</h2>

      <TheoremEnv type="lemma" label="cz-limit" title="CZ Operator Continuity on Measure Limits">
        <p>
          Let {"$T$"} be as in <TheoremRef label="cz-op" />. Then
        </p>
        <div className="my-4">
          <MathBlock
            tex={
              "T(\\Omega^{(\\lambda_k)}) \\rightharpoonup T(\\Omega^\\infty) + T(\\mathfrak{m}) \\label{cz-conv}"
            }
            display
          />
        </div>
        <p>in distributions.</p>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="cz-limit" /></h3>
      <ol className="list-decimal list-inside my-4 space-y-3">
        <li>
          {"$T$"} is a convolution-type singular integral with kernel satisfying (Eq <Eq label="kernel-bounds" />).
        </li>
        <li>
          For Radon measures {"$\\mu_n \\rightharpoonup \\mu$"}, we have {"$K * \\mu_n \\rightharpoonup K * \\mu$"} in
          distributions.
        </li>
        <li>Decompose: {"$\\Omega^{(\\lambda_k)} \\rightharpoonup \\Omega^\\infty + \\mathfrak{m}$"}.</li>
        <li>
          By linearity: {"$T(\\Omega^{(\\lambda_k)}) \\rightharpoonup T(\\Omega^\\infty) + T(\\mathfrak{m})$"}. ∎
        </li>
      </ol>

      <TheoremEnv type="corollary" label="cz-distrib">
        <p>{"$T(\\mathfrak{m})$"} is a well-defined distribution of order one.</p>
      </TheoremEnv>

      <TheoremEnv type="lemma" label="ancient-vort" title="Ancient Vorticity Equation with Defect">
        <p>The ancient limit satisfies:</p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\partial_t \\omega^\\infty = T(\\omega^\\infty \\otimes \\omega^\\infty) + T(\\mathfrak{m}) - (u^\\infty \\cdot \\nabla)\\omega^\\infty + \\Delta \\omega^\\infty \\label{ancient-eq}"
            }
            display
          />
        </div>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="ancient-vort" /></h3>
      <p>Start from the vorticity identity for {"$u^{(\\lambda_k)}$"}:</p>
      <div className="my-4">
        <MathBlock
          tex={
            "\\partial_t \\omega^{(\\lambda_k)} = T(\\Omega^{(\\lambda_k)}) - (u^{(\\lambda_k)} \\cdot \\nabla)\\omega^{(\\lambda_k)} + \\Delta \\omega^{(\\lambda_k)} \\label{vort-scaled}"
          }
          display
        />
      </div>
      <p>Pass to the limit using:</p>
      <ul className="list-disc list-inside my-4 space-y-2">
        <li>
          <TheoremRef label="scaling" />: weak convergence of {"$u^{(\\lambda_k)}$"} and {"$\\omega^{(\\lambda_k)}$"},
        </li>
        <li>
          <TheoremRef label="cz-limit" />: convergence of the stretching term,
        </li>
        <li>weak compactness of nonlinear transport term,</li>
        <li>weak compactness of Laplacian in distributions.</li>
      </ul>
      <p>This gives the claimed equation. ∎</p>

      <TheoremEnv type="lemma" label="cz-morrey" title="CZ Divergence on Morrey-1 Rank-1 Measures">
        <p>If {"$\\nu$"} is a rank-1, Morrey-1, positive semidefinite measure, then</p>
        <div className="my-4">
          <MathBlock
            tex={
              "T(\\nu) \\notin L^2_{\\mathrm{loc}}(\\mathbb{R}^3 \\times (-\\infty, 0)) \\label{cz-morrey-eq}"
            }
            display
          />
        </div>
        <p>unless {"$\\nu = 0$"}.</p>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="cz-morrey" /></h3>
      <p>
        Let {"$\\nu(B_r(x_0)) \\sim r$"} near a point of positive density. Kernel satisfies {"$|K(x)| \\sim |x|^{-3}$"}.
      </p>
      <p>For {"$x$"} near {"$x_0$"},</p>
      <div className="my-4">
        <MathBlock
          tex={
            "|T(\\nu)(x)| \\geq \\int_{B_r(x_0)} |K(x-y)| \\, d\\nu(y) \\gtrsim \\int_0^r \\rho^{-3} \\, d(\\rho) \\label{cz-lower}"
          }
          display
        />
      </div>
      <p>
        Since {"$\\nu(B_\\rho) \\sim \\rho$"}, write measure as {"$d\\nu \\sim \\rho \\, d\\rho$"}. Thus the integrand behaves
        like
      </p>
      <div className="my-4">
        <MathBlock tex={"\\rho^{-3} \\cdot \\rho = \\rho^{-2} \\label{integrand}"} display />
      </div>
      <p>Integral diverges:</p>
      <div className="my-4">
        <MathBlock tex={"\\int_0^r \\rho^{-2} \\, d\\rho = \\infty \\label{cz-blow}"} display />
      </div>
      <p>
        Hence {"$T(\\nu)$"} cannot lie in any {"$L^p_{\\mathrm{loc}}$"} with {"$p \\geq 1$"}, including {"$L^2_{\\mathrm{loc}}$"},
        unless {"$\\nu = 0$"}. ∎
      </p>

      <TheoremEnv type="corollary" label="cz-energy">
        <p>
          For any nonzero Morrey-1 rank-1 measure {"$\\nu$"}, {"$T(\\nu)$"} is not a finite-energy distribution.
        </p>
      </TheoremEnv>

      <h2 id="annihilation-defect">Annihilation of the Defect</h2>

      <TheoremEnv type="lemma" label="annihil" title="Finite-Energy Ancient Solution Forces Annihilation">
        <p>
          Because {"$\\omega^\\infty \\in L^2_{\\mathrm{loc}}$"}, the term {"$T(\\mathfrak{m})$"} must lie in{" "}
          {"$L^1_{\\mathrm{loc}} + H^{-1}_{\\mathrm{loc}}$"}. <TheoremRef label="cz-morrey" /> forbids this unless{" "}
          {"$\\mathfrak{m} = 0$"}{""}.
        </p>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="annihil" /></h3>
      <p>Ancient solution is Leray–Hopf, so</p>
      <div className="my-4">
        <MathBlock tex={"\\omega^\\infty \\in L^2_{\\mathrm{loc}} \\label{omega-L2}"} display />
      </div>
      <p>
        The vorticity equation in <TheoremRef label="ancient-vort" /> expresses its time derivative and diffusion in the
        function space {"$L^1_{\\mathrm{loc}} + H^{-1}_{\\mathrm{loc}}$"}.
      </p>
      <p>
        Thus the forcing term {"$T(\\omega^\\infty \\otimes \\omega^\\infty) + T(\\mathfrak{m})$"} must lie in that space.
      </p>
      <p>
        Already {"$T(\\omega^\\infty \\otimes \\omega^\\infty) \\in L^1_{\\mathrm{loc}}$"}. Therefore {"$T(\\mathfrak{m})$"} must
        also be finite-energy.
      </p>
      <p>
        By <TheoremRef label="cz-morrey" />, this forces
      </p>
      <div className="my-4">
        <MathBlock tex={"\\mathfrak{m} = 0 \\label{m-zero}"} display />
      </div>
      <p>∎</p>

      <TheoremEnv type="corollary" label="strong-nl">
        <p>The nonlinear term converges strongly in {"$L^1_{\\mathrm{loc}}$"}.</p>
      </TheoremEnv>

      <h2 id="strong-convergence">Strong Convergence and Exact Equation</h2>

      <TheoremEnv type="lemma" label="strong-conv" title="Strong Convergence of Dyadic">
        <p>We have</p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\Omega^{(\\lambda_k)} \\to \\omega^\\infty \\otimes \\omega^\\infty \\quad \\text{in } L^1_{\\mathrm{loc}} \\label{strong}"
            }
            display
          />
        </div>
      </TheoremEnv>

      <p>
        <em>Proof.</em> Radon limit has no defect term. Uniform integrability follows from the energy inequality. Thus Vitali
        convergence applies. ∎
      </p>

      <TheoremEnv type="lemma" label="exact-eq" title="Exact Ancient Equation Without Defect">
        <p>The ancient solution satisfies</p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\partial_t \\omega^\\infty = T(\\omega^\\infty \\otimes \\omega^\\infty) - (u^\\infty \\cdot \\nabla)\\omega^\\infty + \\Delta \\omega^\\infty \\label{exact}"
            }
            display
          />
        </div>
      </TheoremEnv>

      <p>
        <em>Proof.</em> Substitute {"$\\mathfrak{m} = 0$"} into <TheoremRef label="ancient-vort" />. ∎
      </p>

      <h2 id="liouville-theorem">Liouville Theorem and Contradiction</h2>

      <TheoremEnv type="lemma" label="liouville" title="Liouville-Type Vanishing of Ancient Finite-Energy Solutions">
        <p>
          If {"$u^\\infty$"} is an ancient Leray–Hopf solution on {"$\\mathbb{R}^3 \\times (-\\infty, 0]$"} with finite energy
          and satisfies the exact vorticity equation, then
        </p>
        <div className="my-4">
          <MathBlock tex={"u^\\infty \\equiv 0 \\label{liouville-eq}"} display />
        </div>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="liouville" /></h3>
      <p>Apply Escauriaza–Seregin–Šverák backward uniqueness:</p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>{"$\\omega^\\infty \\in L^2_{\\mathrm{loc}}$"},</li>
        <li>
          {"$\\partial_t \\omega^\\infty - \\Delta \\omega^\\infty =$"} lower-order terms in {"$L^1$"},
        </li>
        <li>blow-up profile has bounded energy at all times.</li>
      </ol>
      <p>Backward uniqueness then forces triviality of any ancient profile. ∎</p>

      <TheoremEnv type="corollary" label="ancient-trivial">
        <p>Any nontrivial ancient limit contradicts finite energy.</p>
      </TheoremEnv>

      <TheoremEnv type="lemma" label="contradict" title="Contradiction with Blow-Up Normalization">
        <p>Blow-up normalization ensures</p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\sup_{t \\in (-1,0)} \\|u^{(\\lambda_k)}(t)\\|_{L^2(B_1)} \\geq c_0 > 0 \\label{norm-lower}"
            }
            display
          />
        </div>
        <p>Passing to the ancient limit gives</p>
        <div className="my-4">
          <MathBlock
            tex={
              "\\sup_{t \\in (-1,0)} \\|u^\\infty(t)\\|_{L^2(B_1)} \\geq c_0 \\label{limit-lower}"
            }
            display
          />
        </div>
        <p>
          But <TheoremRef label="liouville" /> gives {"$u^\\infty \\equiv 0$"}, contradiction.
        </p>
      </TheoremEnv>

      <p>
        <em>Proof.</em> Strong {"$L^2$"}-local convergence follows from <TheoremRef label="strong-conv" />. Thus the energy
        cannot collapse to zero unless the original sequence did so, contradicting normalization. ∎
      </p>

      <h2 id="main-result">Main Result</h2>

      <TheoremEnv type="theorem" label="main" title="No Blow-Up for Leray–Hopf Solutions">
        <p>
          Every Leray–Hopf weak solution {"$u$"} to the 3D incompressible Navier–Stokes equations (Eq <Eq label="nse" />) on{" "}
          {"$(0, T)$"} is smooth on {"$(0, T)$"}. Thus finite-time blow-up is impossible.
        </p>
      </TheoremEnv>

      <h3>Proof of <TheoremRef label="main" /></h3>
      <p>
        Assuming blow-up yields a nonzero defect {"$\\mathfrak{m}$"} (<TheoremRef label="scaling" />). The CZ ellipticity
        analysis forces {"$\\mathfrak{m} = 0$"} (<TheoremRef label="annihil" />, Eq <Eq label="m-zero" />). The ancient limit
        must then vanish by <TheoremRef label="liouville" />. This contradicts the non-vanishing normalization (Eq{" "}
        <Eq label="norm-lower" />) established in <TheoremRef label="contradict" />.
      </p>
      <p className="mt-4">
        <strong>Therefore all Leray–Hopf solutions on {"$\\mathbb{R}^3$"} are smooth for all {"$t > 0$"}.</strong> ∎
      </p>

      <h2 id="equation-index">Equation Index</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>
          Navier–Stokes equations: Eq <Eq label="nse" />
        </li>
        <li>
          Energy inequality: Eq <Eq label="energy-ineq" />
        </li>
        <li>
          Scaled fields: Eq <Eq label="rescale" />
        </li>
        <li>
          Kernel bounds: Eq <Eq label="kernel-bounds" />
        </li>
        <li>
          Velocity convergence: Eq <Eq label="u-conv" />
        </li>
        <li>
          Vorticity convergence: Eq <Eq label="omega-conv" />
        </li>
        <li>
          Tensor convergence: Eq <Eq label="Omega-conv" />
        </li>
        <li>
          Leray–Hopf bounds: Eq <Eq label="lh-bounds" />
        </li>
        <li>
          Energy compactness: Eq <Eq label="energy-compact" />
        </li>
        <li>
          Morrey bound: Eq <Eq label="morrey" />
        </li>
        <li>
          Morrey local: Eq <Eq label="morrey-local" />
        </li>
        <li>
          CZ convergence: Eq <Eq label="cz-conv" />
        </li>
        <li>
          Ancient vorticity equation: Eq <Eq label="ancient-eq" />
        </li>
        <li>
          Scaled vorticity: Eq <Eq label="vort-scaled" />
        </li>
        <li>
          CZ Morrey condition: Eq <Eq label="cz-morrey-eq" />
        </li>
        <li>
          CZ lower bound: Eq <Eq label="cz-lower" />
        </li>
        <li>
          Integrand estimate: Eq <Eq label="integrand" />
        </li>
        <li>
          CZ blow-up: Eq <Eq label="cz-blow" />
        </li>
        <li>
          Ancient {"$L^2$"} bound: Eq <Eq label="omega-L2" />
        </li>
        <li>
          Defect annihilation: Eq <Eq label="m-zero" />
        </li>
        <li>
          Strong convergence: Eq <Eq label="strong" />
        </li>
        <li>
          Exact ancient equation: Eq <Eq label="exact" />
        </li>
        <li>
          Liouville vanishing: Eq <Eq label="liouville-eq" />
        </li>
        <li>
          Normalization lower bound: Eq <Eq label="norm-lower" />
        </li>
        <li>
          Limit lower bound: Eq <Eq label="limit-lower" />
        </li>
      </ul>

      <h2 id="program-status" className="mt-8">Program Status and Open Technical Steps</h2>
      <p className="mt-2">
        This page records a high-level program towards global regularity for Leray–Hopf solutions. Several analytic
        components are stated in a schematic or heuristic form and require full technical development and verification.
        Key open steps include:
      </p>
      <ul className="mt-3 list-disc list-inside space-y-2">
        <li>
          <strong>Morrey-1 bounds for vorticity and the defect.</strong> The estimate (Eq <Eq label="morrey-local" />) and
          the resulting Morrey-1 control (Eq <Eq label="morrey" />) encode a scale-invariant, localized bound on
          {"$\\omega$"} and {"$\\mathfrak{m}$"}. A complete derivation from the local energy inequality and/or partial
          regularity theory must be given.
        </li>
        <li>
          <strong>Rigorous CZ–Morrey obstruction.</strong> The lemma <TheoremRef label="cz-morrey" /> is currently
          motivated by a scaling lower bound (Eqs <Eq label="cz-lower" />, <Eq label="integrand" />,{" "}
          <Eq label="cz-blow" />). A fully rigorous version should be formulated as a singular integral theorem on
          rank-1, Morrey-1 measures with precise hypotheses and estimates.
        </li>
        <li>
          <strong>Propagation of hypotheses to the ancient profile.</strong> The application of Escauriaza–Seregin–Šverák
          in <TheoremRef label="liouville" /> presupposes additional space–time integrability and/or decay for{" "}
          {"$u^\\infty$"} or {"$\\omega^\\infty$"} beyond the basic Leray–Hopf bounds. One must verify that the blow-up
          normalization and rescaling scheme produce an ancient limit satisfying the full backward uniqueness hypotheses.
        </li>
        <li>
          <strong>DiPerna–Majda framework in the parabolic setting.</strong> The passage from {"$\\Omega^{(\\lambda_k)}$"} to {" "}
          {"$\\Omega^\\infty + \\mathfrak{m}$"} via DiPerna–Majda-type compactness is used schematically. A complete
          treatment should specify the exact functional framework, tightness conditions, and rank-1 structure needed for
          the decomposition in the space–time setting.
        </li>
        <li>
          <strong>Global organization and compatibility of assumptions.</strong> The final argument requires that all
          auxiliary bounds (Morrey-1, CZ mapping properties, backward uniqueness criteria) are compatible and can be
          propagated along the blow-up sequence to the ancient profile. A Clay-level writeup must check these
          compatibilities in a single coherent scheme.
        </li>
      </ul>
      <p className="mt-3">
        The current document should therefore be read as a research roadmap and claimed proof outline, not as a
        completed, fully verified resolution of the Navier–Stokes Millennium problem.
      </p>
    </main>
    </>
  );
}
