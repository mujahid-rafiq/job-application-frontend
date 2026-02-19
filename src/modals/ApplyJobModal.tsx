import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    Grid
} from '@mui/material';
import { X, Upload, Send, FileText, User, Mail, Phone } from 'lucide-react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 600 },
    bgcolor: 'background.paper',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    p: 0,
    outline: 'none',
    overflow: 'hidden'
};

interface ApplyJobModalProps {
    open: boolean;
    onClose: () => void;
    jobTitle: string;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({ open, onClose, jobTitle }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for submission will go here
        alert('Application submitted successfully! (UI Only)');
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="apply-modal-title"
            closeAfterTransition
        >
            <Box sx={style}>
                {/* Header */}
                <Box sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, #3E7EFF 0%, #2E6BFF 100%)',
                    color: 'white',
                    position: 'relative'
                }}>
                    <Typography id="apply-modal-title" variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                        Apply for Position
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                        {jobTitle}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                    >
                        <X size={24} />
                    </IconButton>
                </Box>

                {/* Form Content */}
                <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, maxHeight: '70vh', overflowY: 'auto' }}>
                    <Grid container spacing={3}>
                        {/* Full Name */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#4B5563' }}>
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="John Doe"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <User size={18} style={{ marginRight: 12, color: '#9CA3AF' }} />,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>

                        {/* Email Address */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#4B5563' }}>
                                Email Address
                            </Typography>
                            <TextField
                                fullWidth
                                type="email"
                                placeholder="john@example.com"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <Mail size={18} style={{ marginRight: 12, color: '#9CA3AF' }} />,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>

                        {/* Phone Number */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#4B5563' }}>
                                Phone Number
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="+1 (555) 000-0000"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <Phone size={18} style={{ marginRight: 12, color: '#9CA3AF' }} />,
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>

                        {/* Resume Upload */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#4B5563' }}>
                                Upload Resume (PDF)
                            </Typography>
                            <Box
                                sx={{
                                    border: '2px dashed #E5E7EB',
                                    borderRadius: '16px',
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { borderColor: '#3E7EFF', bgcolor: '#F9FAFB' },
                                    position: 'relative'
                                }}
                                component="label"
                            >
                                <input
                                    type="file"
                                    hidden
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                />
                                <Upload size={32} style={{ color: '#3E7EFF', marginBottom: 8 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                                    {fileName || "Click to upload or drag and drop"}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                                    PDF, DOC up to 5MB
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Cover Letter / Message */}
                        <Grid size={{ xs: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#4B5563' }}>
                                Cover Letter (Optional)
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Tell us why you are a great fit..."
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 700,
                                color: '#4B5563',
                                borderColor: '#E5E7EB'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            startIcon={<Send size={18} />}
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 700,
                                bgcolor: '#3E7EFF',
                                '&:hover': { bgcolor: '#2E6BFF' },
                                boxShadow: '0 4px 14px 0 rgba(62, 126, 255, 0.39)'
                            }}
                        >
                            Submit Application
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ApplyJobModal;
