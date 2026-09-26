/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (mobileMenu.classList.contains("active")) {

        icon.className = "fa-solid fa-xmark";

    } else {

        icon.className = "fa-solid fa-bars";

    }

});


/* Close mobile menu */

document.querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            menuBtn.querySelector("i").className =
                "fa-solid fa-bars";

        });

    });


/* ==========================================
   RESULT HELPER
========================================== */

function showResult(element, message, type = "success") {

    element.textContent = message;

    element.className = "result " + type;

}


/* ==========================================
   OHM'S LAW
==========================================

   V = I × R

   I = V / R

   R = V / I

========================================== */

function calculateOhm() {

    const type =
        document.getElementById("ohmType").value;

    const current =
        parseFloat(
            document.getElementById("ohmCurrent").value
        );

    const resistance =
        parseFloat(
            document.getElementById("ohmResistance").value
        );

    const result =
        document.getElementById("ohmResult");


    if (type === "voltage") {

        if (isNaN(current) ||
            isNaN(resistance)) {

            showResult(
                result,
                "Enter current and resistance.",
                "error"
            );

            return;
        }

        const voltage =
            current * resistance;

        showResult(
            result,
            `Voltage = ${voltage.toFixed(2)} V`
        );

    }


    else if (type === "current") {

        if (isNaN(current) &&
            !isNaN(resistance)) {

            showResult(
                result,
                "Enter voltage in the Current field.",
                "error"
            );

            return;
        }

        showResult(
            result,
            "For current calculation use V ÷ R.",
            "error"
        );

    }


    else {

        showResult(
            result,
            "For resistance calculation use V ÷ I.",
            "error"
        );

    }

}


/* ==========================================
   POWER
========================================== */

function calculatePower() {

    const voltage =
        parseFloat(
            document.getElementById("powerVoltage").value
        );

    const current =
        parseFloat(
            document.getElementById("powerCurrent").value
        );

    const result =
        document.getElementById("powerResult");


    if (isNaN(voltage) ||
        isNaN(current)) {

        showResult(
            result,
            "Enter voltage and current.",
            "error"
        );

        return;
    }


    const power =
        voltage * current;


    showResult(
        result,
        `Power = ${power.toFixed(2)} W`
    );

}


/* ==========================================
   SERIES / PARALLEL RESISTANCE
========================================== */

function calculateResistance() {

    const type =
        document.getElementById(
            "resistanceType"
        ).value;

    const values =
        document.getElementById(
            "resistanceValues"
        ).value;


    const result =
        document.getElementById(
            "resistanceResult"
        );


    const resistors =
        values
            .split(",")
            .map(value => parseFloat(value.trim()))
            .filter(value => !isNaN(value));


    if (resistors.length < 2) {

        showResult(
            result,
            "Enter at least two resistances.",
            "error"
        );

        return;
    }


    let equivalent;


    /* Series */

    if (type === "series") {

        equivalent =
            resistors.reduce(
                (total, resistance) =>
                    total + resistance,
                0
            );

    }


    /* Parallel */

    else {

        const reciprocalSum =
            resistors.reduce(
                (total, resistance) =>
                    total + (1 / resistance),
                0
            );

        equivalent =
            1 / reciprocalSum;

    }


    showResult(
        result,
        `Equivalent Resistance = ${equivalent.toFixed(3)} Ω`
    );

}


/* ==========================================
   AC POWER
==========================================

   S = V × I

   P = V × I × PF

   Q = √(S² - P²)

========================================== */

function calculateACPower() {

    const voltage =
        parseFloat(
            document.getElementById(
                "acVoltage"
            ).value
        );

    const current =
        parseFloat(
            document.getElementById(
                "acCurrent"
            ).value
        );

    const pf =
        parseFloat(
            document.getElementById(
                "powerFactor"
            ).value
        );


    const result =
        document.getElementById(
            "acResult"
        );


    if (isNaN(voltage) ||
        isNaN(current) ||
        isNaN(pf)) {

        showResult(
            result,
            "Enter voltage, current and power factor.",
            "error"
        );

        return;
    }


    if (pf < 0 || pf > 1) {

        showResult(
            result,
            "Power factor must be between 0 and 1.",
            "error"
        );

        return;
    }


    const apparentPower =
        voltage * current;

    const realPower =
        apparentPower * pf;

    const reactivePower =
        Math.sqrt(
            Math.pow(apparentPower, 2) -
            Math.pow(realPower, 2)
        );


    showResult(
        result,
        `P = ${realPower.toFixed(2)} W | ` +
        `Q = ${reactivePower.toFixed(2)} VAR | ` +
        `S = ${apparentPower.toFixed(2)} VA`
    );

}


/* ==========================================
   TRANSFORMER
==========================================

   V2 / V1 = N2 / N1

   Therefore:

   V2 = V1 × N2 / N1

========================================== */

function calculateTransformer() {

    const primaryVoltage =
        parseFloat(
            document.getElementById(
                "primaryVoltage"
            ).value
        );

    const primaryTurns =
        parseFloat(
            document.getElementById(
                "primaryTurns"
            ).value
        );

    const secondaryTurns =
        parseFloat(
            document.getElementById(
                "secondaryTurns"
            ).value
        );


    const result =
        document.getElementById(
            "transformerResult"
        );


    if (isNaN(primaryVoltage) ||
        isNaN(primaryTurns) ||
        isNaN(secondaryTurns)) {

        showResult(
            result,
            "Enter all transformer values.",
            "error"
        );

        return;
    }


    if (primaryTurns <= 0 ||
        secondaryTurns <= 0) {

        showResult(
            result,
            "Turns must be greater than zero.",
            "error"
        );

        return;
    }


    const secondaryVoltage =
        primaryVoltage *
        (secondaryTurns / primaryTurns);


    const turnsRatio =
        secondaryTurns / primaryTurns;


    const type =
        secondaryVoltage > primaryVoltage
            ? "Step-Up"
            : secondaryVoltage < primaryVoltage
                ? "Step-Down"
                : "1:1";


    showResult(
        result,
        `V₂ = ${secondaryVoltage.toFixed(2)} V | ` +
        `Ratio = ${turnsRatio.toFixed(3)} | ` +
        `${type}`
    );

}


/* ==========================================
   CHANGE OHM INPUTS BASED ON CALCULATION
========================================== */

const ohmType =
    document.getElementById("ohmType");

ohmType.addEventListener("change", () => {

    const current =
        document.getElementById("ohmCurrent");

    const resistance =
        document.getElementById("ohmResistance");


    current.value = "";
    resistance.value = "";


    if (ohmType.value === "voltage") {

        current.placeholder = "e.g. 5";
        resistance.placeholder = "e.g. 46";

    }

    else if (ohmType.value === "current") {

        current.placeholder = "Enter voltage";
        resistance.placeholder = "Enter resistance";

    }

    else {

        current.placeholder = "Enter voltage";
        resistance.placeholder = "Enter current";

    }

});
