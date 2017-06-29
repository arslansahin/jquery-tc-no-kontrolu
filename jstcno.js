/**
 * T.C. Algoritma Kontrolü
 * 16.07.2014 
 * Arslan ŞAHİN
 * http://kod2.net
 * jQuery ile Turkiye Cumhuriyeti Kimlik Numarası Kontrol Eklentisi
 * Eklenti verilen seçici içerisindeki datanın T.C. Numarası algoritmasına uyumlu olup olmadığını kontrol ederek geribildirimde bulunur.
 * @returns {jQuery.fn@call;each}
 */
jQuery.fn.jstcno = function() {

    var args = arguments[0] || {};

    var gosterge = args.gosterge;

    var mesaj = args.mesaj;

    if (!mesaj) {
        mesaj = 'T.C. no hatalı';
    }

    var tcno = null;

    /**
     * T.C. numarsı kontrolü
     * @param {type} n
     * @returns {Number}
     */
    tc = function jstcno(n) {
        var t = String(n), i;
        if (t == "")
            return !0;
        if (!t.match(/^[0-9]{11}$/))
            return !1;
        if (i = parseInt(t.substr(0, 1)), i == 0)
            return !0;
        var r = parseInt(t.substr(1, 1)),
                u = parseInt(t.substr(2, 1)),
                f = parseInt(t.substr(3, 1)),
                e = parseInt(t.substr(4, 1)),
                o = parseInt(t.substr(5, 1)),
                s = parseInt(t.substr(6, 1)),
                h = parseInt(t.substr(7, 1)),
                c = parseInt(t.substr(8, 1)),
                l = parseInt(t.substr(9, 1)),
                a = parseInt(t.substr(10, 1));
        return (10 - ((i + u + e + s + c) * 3 + r + f + o + h) % 10) % 10 != l ||
                (10 - ((r + f + o + h + l) * 3 + i + u + e + s + c) % 10) % 10 != a ?
                !1 : !0

    }

    /**
     * Klavyeden girişine izin verilen karakter kodları
     * @param {type} evt
     * @returns {Boolean}
     */
    numeric = function jssayi(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode
        return ((charCode >= 48 && charCode < 58) || (charCode >= 96 && charCode < 106) || charCode == 8 || charCode == 46 || charCode == 39 || charCode == 37);
        //return charCode;
    }

    return this.each(function() {

        var $this = $(this);

        var error = null;

        $this.keyup(function(event) {

            tcno = jQuery(this).val();

            if (numeric(event) == false) {
                
                /*
                 * Girilen değer içerisindeki sayısal olmayan değerleri temizle
                 */
                jQuery(this).val(tcno.substr(0, parseFloat(tcno.length) - 1));
            }
            else if (tcno.length > 11) {
                
                /*
                 * Yazılan t.c. no 11 karakterden uzunsa yazılan verinin ilk 11 rakamını al
                 */
                jQuery(this).val(tcno.substr(0, 11));
            }
            else if (tcno.length < 11) {
                error = 'T.C no 11 karakterden oluşmalıdır';
            }
            else if (tc(tcno) == false) {
                error = mesaj;
            } else {
                error = '';
            }
            jQuery(gosterge).html(error);


        });


    });



};

